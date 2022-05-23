import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as _ from 'lodash';
import { IPreference } from 'src/app/models/preference.model';
import { IUser } from 'src/app/models/user.model';
import { PreferenceService } from 'src/app/preference/preference.service';
import { environment } from 'src/environments/environment';
import { UsersService } from '../users.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent implements OnInit {
  userForm!: FormGroup;
  isLoadingResults: boolean = false;
  preferences: IPreference[] = [];
  backupUser!: IUser;
  imagePreview!: string;
  isEdit: boolean = false;
  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private $preference: PreferenceService,
    private route: ActivatedRoute,
    private $user: UsersService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.$preference.getAll({ page: 1, limit: 10000 }).subscribe({
      next: (result) => {
        if (result) {
          this.preferences = result.data;
          this.route.paramMap.subscribe({
            next: (paramMap: ParamMap) => {
              if (
                paramMap.has('id') &&
                paramMap.get('id') &&
                paramMap.get('id') !== 'new'
              ) {
                const userId = paramMap.get('id');
                this.$user.getOne(userId!).subscribe({
                  next: (result: any) => {
                    this.isEdit = true;
                    const user: any = result;
                    this.backupUser = _.cloneDeep(result);
                    const userFormData: IUser = {
                      name: user.name,
                      email: user.email,
                      password: user.password,
                      photo: user.photo,
                      preference: (user.preference ?? []).map(
                        (_p: any) => _p._id
                      ),
                    };
                    this.imagePreview = user.photo;
                    this.userForm.setValue({
                      ...userFormData,
                    });
                  },
                });
              }
            },
          });
        }
      },
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      photo: [null, Validators.required],
      preference: [null, Validators.required],
    });
  }

  onFormSubmit = () => {
    if (this.userForm.valid) {
      this.$user
        .getUsers({ email: this.userForm.get('email')?.value })
        .subscribe({
          next: (result) => {
            let filteredUsers = result.data.filter(
              (_user: any) => _user._id !== _.get(this, 'backupUser._id', '')
            );
            if (!filteredUsers.length) {
              if (!this.isEdit) {
                this.saveUser();
              } else {
                this.updateUser();
              }
            } else {
              this._snackBar.open('Email Already Exists !!', 'close');
            }
          },
        });
    } else {
      console.log(this.userForm.value);
    }
  };

  saveUser = () => {
    this.$user.create(this.userForm?.value).subscribe({
      next: (result) => {
        this.$user.actionPerformed();
        this.clear();
        this.router.navigate(['users']);
      },
      complete: () => {
        this._snackBar.open('User Saved SuccessFully', 'close');
      },
    });
  };

  onImagePicked = (event: Event) => {
    const file = (event.target as HTMLInputElement).files![0];
    this.userForm.patchValue({ photo: file });
    this.userForm.get('photo')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  updateUser = () => {
    const user: IUser = { ...this.userForm.value };
    user._id = this.backupUser._id;
    this.$user.updateOne(user).subscribe({
      next: (result) => {
        this.$user.actionPerformed();
        this.clear();
        this.router.navigate(['users']);
      },
      complete: () => {
        this._snackBar.open('User updated SuccessFully', 'close');
      },
    });
  };

  clear() {
    this.userForm.reset();
    this.isEdit = false;
  }
}
