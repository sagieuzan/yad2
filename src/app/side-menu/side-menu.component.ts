import { Component } from '@angular/core';
import { Input,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-menu',
  imports: [CommonModule ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  constructor(private router:Router){

  }

  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  navTo(where:string){
    this.router.navigate([where])
  }
}
