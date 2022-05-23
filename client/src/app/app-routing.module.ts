import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('./user/user.module')).UserModule,
      },
    ],
  },
  {
    path: 'preferences',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('./preference/preference.module')).PreferenceModule,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
