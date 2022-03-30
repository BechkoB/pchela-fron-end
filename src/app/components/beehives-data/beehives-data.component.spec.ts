import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeehivesDataComponent } from './beehives-data.component';

describe('BeehivesDataComponent', () => {
  let component: BeehivesDataComponent;
  let fixture: ComponentFixture<BeehivesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeehivesDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeehivesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
