import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientquizComponent } from './patientquiz.component';

describe('PatientquizComponent', () => {
  let component: PatientquizComponent;
  let fixture: ComponentFixture<PatientquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientquizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
