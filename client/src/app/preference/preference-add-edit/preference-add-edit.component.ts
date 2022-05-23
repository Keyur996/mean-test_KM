import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { IPreference } from 'src/app/models/preference.model';
import { PreferenceService } from '../preference.service';

@Component({
  selector: 'app-preference-add-edit',
  templateUrl: './preference-add-edit.component.html',
  styleUrls: ['./preference-add-edit.component.scss'],
})
export class PreferenceAddEditComponent implements OnInit {
  preferenceForm!: FormGroup;
  isEdit: boolean = false;
  backupPerference!: IPreference;
  constructor(
    private fb: FormBuilder,
    private $preference: PreferenceService,
    private _snakeBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.preferenceForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.$preference.isEdit().subscribe({
      next: (result: IPreference) => {
        if (result) {
          this.isEdit = true;
          this.backupPerference = _.cloneDeep(result);
          this.preferenceForm.patchValue({ ...result });
        }
      },
    });
  }

  onFormSubmit(): void {
    if (this.preferenceForm.valid) {
      this.$preference
        .getAll({ name: this.preferenceForm.get('name')?.value })
        .subscribe({
          next: (result) => {
            let filteredResult = (result?.data ?? []).filter(
              (_p: any) => _p._id !== this.backupPerference._id
            );
            if (!filteredResult.length) {
              !this.isEdit ? this.savePreference() : this.updatePreference();
            } else {
              this._snakeBar.open('Name Already Exists !!', 'close');
            }
          },
          error: () => {
            this._snakeBar.open('Something Went Wrong !!', 'close');
          },
        });
      // console.log(this.preferenceForm.value);
    } else {
      this._snakeBar.open('Plese Enater Valid Data', 'close');
    }
  }

  savePreference = () => {
    this.$preference.create(this.preferenceForm.value).subscribe({
      next: (result: any) => {
        console.log('result', result);
        this._snakeBar.open('Preference created Successfully !!', 'close');
      },
      complete: () => {
        this.$preference.actionPerformed();
      },
    });
  };

  updatePreference = () => {
    const preference: IPreference = {
      _id: this.backupPerference._id,
      name: this.preferenceForm.get('name')?.value,
    };
    this.$preference.updateOne(preference).subscribe({
      next: (result: any) => {
        console.log('result', result);
        this._snakeBar.open('Preference Updated Successfully !!', 'close');
      },
      complete: () => {
        this.$preference.actionPerformed();
        this.onClear();
      },
    });
  };

  onClear = (): void => {
    this.preferenceForm.reset();
    this.isEdit = false;
  };
}
