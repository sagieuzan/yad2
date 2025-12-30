import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealEstateHeaderComponent } from './real-estate-header/real-estate-header.component';
@Component({
  selector: 'app-real-estate',
  imports: [CommonModule, RealEstateHeaderComponent],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.css'
})
export class RealEstateComponent {
  mobileView: 'list' | 'map' = 'list';
  properties = [
    {
      id: 1,
      price: 12600000,
      address: 'תל ברוך צפון',
      city: 'תל אביב יפו',
      type: 'בית פרטי/ קוטג\'',
      rooms: 6,
      floor: 0,
      sqm: 240,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-e32cb5313824?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isNewProject: false
    },
    {
      id: 2,
      price: 2990000,
      address: 'סמטת השחר',
      city: 'אור יהודה',
      type: 'דירה',
      rooms: 5,
      floor: 4,
      sqm: 150,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isNewProject: false
    },
    {
      id: 3,
      price: 4500000,
      address: 'פרויקט היוקרה BE YA',
      city: 'באר יעקב',
      type: 'פרויקט חדש',
      rooms: 4,
      floor: 12,
      sqm: 110,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isNewProject: true
    },
    {
      id: 4,
      price: 3200000,
      address: 'רחוב הירקון',
      city: 'תל אביב',
      type: 'דירת גן',
      rooms: 3,
      floor: 1,
      sqm: 95,
      imageUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isNewProject: false
    },
    {
      id: 5,
      price: 1850000,
      address: 'שכונת הפרחים',
      city: 'פתח תקווה',
      type: 'דירה',
      rooms: 3.5,
      floor: 3,
      sqm: 88,
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isNewProject: false
    }
  ];

  toggleMobileView() {
    this.mobileView = this.mobileView === 'map' ? 'list' : 'map';
  }
}
