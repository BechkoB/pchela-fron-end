import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeegardenComponent } from './add-beegarden.component';

describe('AddBeegardenComponent', () => {
  let component: AddBeegardenComponent;
  let fixture: ComponentFixture<AddBeegardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBeegardenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeegardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
