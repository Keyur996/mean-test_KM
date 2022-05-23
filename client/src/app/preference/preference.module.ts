import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenceRoutingModule } from './preference-routing.module';
import { PreferenceComponent } from './preference.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PreferenceAddEditComponent } from './preference-add-edit/preference-add-edit.component';
import { MatCustomTableModule } from '../shared/components/mat-custom-table/mat-custom-table.module';
import { PreferenceService } from './preference.service';

@NgModule({
  declarations: [PreferenceComponent, PreferenceAddEditComponent],
  imports: [
    CommonModule,
    PreferenceRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCustomTableModule,
  ],
  providers: [PreferenceService],
})
export class PreferenceModule {}
