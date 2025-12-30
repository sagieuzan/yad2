import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterHeaderComponent } from './master-header.component';

describe('MasterHeaderComponent', () => {
  let component: MasterHeaderComponent;
  let fixture: ComponentFixture<MasterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
