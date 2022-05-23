import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { UserRoutingRoutingModule } from './user-routing-routing.module';
import { MatCustomTableModule } from '../shared/components/mat-custom-table/mat-custom-table.module';
import { UsersService } from './users.service';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { PreferenceModule } from '../preference/preference.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FileUploadService } from './file-upload.service';

const routes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  declarations: [UserComponent, UserAddEditComponent],
  imports: [
    CommonModule,
    UserRoutingRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatCustomTableModule,
    PreferenceModule,
    RouterModule,
  ],
  providers: [UsersService, FileUploadService],
})
export class UserModule {}
