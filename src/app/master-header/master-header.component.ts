import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-header',
  imports: [],
  templateUrl: './master-header.component.html',
  styleUrl: './master-header.component.css'
})
export class MasterHeaderComponent {
  constructor(private router:Router){

  }
  @Output() sideMenuToggle = new EventEmitter<void>();

  toggleSideMenu(){
    this.sideMenuToggle.emit();
  }

  navTo(where:string|null){
    this.router.navigate([where])
  }
}
