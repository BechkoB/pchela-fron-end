import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeehiveComponent } from './add-beehive.component';

describe('AddBeehiveComponent', () => {
  let component: AddBeehiveComponent;
  let fixture: ComponentFixture<AddBeehiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBeehiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeehiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
