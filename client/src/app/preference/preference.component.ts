import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { result } from 'lodash';
import { IPreference } from '../models/preference.model';
import { TableConsts } from '../shared/components/mat-custom-table/components/action-buttons/constants/table.constant';
import { TableButtonAction } from '../shared/components/mat-custom-table/components/action-buttons/models/tableButtonAction.model';
import { PreferenceService } from './preference.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
})
export class PreferenceComponent implements OnInit {
  preferences: IPreference[] = [];
  columns = [{ columnDef: 'name', header: 'Name' }];
  constructor(
    public $preference: PreferenceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPreferences();
    this.$preference.isActionPerformed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.getPreferences();
        }
      },
    });
  }

  getPreferences = (queryParams?: any) => {
    this.$preference.getAll(queryParams ?? {}).subscribe({
      next: (result: any) => {
        if (result.success) {
          this.preferences = _.cloneDeep(result.data);
          this.$preference.dataChanged(result);
        }
      },
    });
  };

  onTableAction(e: TableButtonAction) {
    const run = {
      [TableConsts.actionButton.edit]: this.$preference.startEdit,
      [TableConsts.actionButton.delete]: this.onDelete,
    };

    run[e.name](e.value);
  }

  onDelete = (preference: IPreference) => {
    if (confirm('Are you sure ??')) {
      this.$preference.deleteOne(preference).subscribe({
        next: (result: any) => {
          if (result.success) {
            this._snackBar.open('Deleted Successfully !!', 'close');
          }
        },
        complete: () => {
          this.$preference.actionPerformed();
        },
      });
    }
  };
}
