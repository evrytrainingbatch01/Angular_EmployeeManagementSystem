import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepOneComponent } from './form-step-one.component';

describe('FormStepOneComponent', () => {
  let component: FormStepOneComponent;
  let fixture: ComponentFixture<FormStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
