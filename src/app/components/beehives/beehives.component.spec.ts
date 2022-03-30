import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeehivesComponent } from './beehives.component';

describe('BeehivesComponent', () => {
  let component: BeehivesComponent;
  let fixture: ComponentFixture<BeehivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeehivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeehivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
