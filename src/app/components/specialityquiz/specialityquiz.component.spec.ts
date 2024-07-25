import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityquizComponent } from './specialityquiz.component';

describe('SpecialityquizComponent', () => {
  let component: SpecialityquizComponent;
  let fixture: ComponentFixture<SpecialityquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialityquizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialityquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
