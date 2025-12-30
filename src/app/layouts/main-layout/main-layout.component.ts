import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterHeaderComponent } from '../../master-header/master-header.component';
import { SideMenuComponent } from '../../side-menu/side-menu.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,MasterHeaderComponent,SideMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  title = 'yad2';

  sideMenuOpen = false;

  toggleSideMenu() {
  this.sideMenuOpen = !this.sideMenuOpen;
  }
}
