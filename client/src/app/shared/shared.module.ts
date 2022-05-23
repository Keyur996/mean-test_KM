import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, SidenavComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MaterialModule],
})
export class SharedModule {}
