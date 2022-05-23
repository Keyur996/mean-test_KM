import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sideNav!: MatSidenav;

  constructor() {}

  ngOnInit(): void {}

  toggleSideNav(): void {
    this.sideNav.toggle();
  }
}
