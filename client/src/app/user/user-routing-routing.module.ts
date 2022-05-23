import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent, pathMatch: 'full' },
  { path: ':id', component: UserAddEditComponent },
  { path: 'new', component: UserAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingRoutingModule {}
