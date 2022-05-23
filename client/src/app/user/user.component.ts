import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';
import { TableConsts } from '../shared/components/mat-custom-table/components/action-buttons/constants/table.constant';
import { TableButtonAction } from '../shared/components/mat-custom-table/components/action-buttons/models/tableButtonAction.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: IUser[] = [];
  columns = [
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'password', header: 'Password' },
    {
      columnDef: 'preference',
      header: 'Preference',
      isObject: true,
      field: 'name',
    },
    { columnDef: 'photo', header: 'Photo', isImage: true },
  ];

  constructor(
    public $users: UsersService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.$users.isActionPerformed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.getUsers();
        }
      },
    });
  }

  getUsers = () => {
    this.$users.getUsers().subscribe({
      next: (result) => {
        if (result['success']) {
          this.users = result['data'];
          this.$users.dataChanged(result);
        }
      },
    });
  };

  onTableAction(event: TableButtonAction) {
    const run = {
      [TableConsts.actionButton.edit]: this.onEdit,
      [TableConsts.actionButton.delete]: this.onDelete,
    };

    run[event.name](event.value);
  }

  onEdit = (value: any) => {
    const id = value._id;
    this.router.navigate(['/users', id]);
  };

  onDelete = (value: any) => {
    if (confirm('Are you sure ??')) {
      this.$users.deleteOne(value).subscribe({
        next: (result: any) => {
          if (result.success) {
            this._snackBar.open('Deleted Successfully !!', 'close');
          }
        },
        complete: () => {
          this.$users.actionPerformed();
        },
      });
    }
  };
}
