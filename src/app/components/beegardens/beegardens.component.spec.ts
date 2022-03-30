import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeegardensComponent } from './beegardens.component';

describe('BeegardensComponent', () => {
  let component: BeegardensComponent;
  let fixture: ComponentFixture<BeegardensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeegardensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeegardensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
