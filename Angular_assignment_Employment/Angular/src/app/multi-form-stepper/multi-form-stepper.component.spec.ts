import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFormStepperComponent } from './multi-form-stepper.component';

describe('MultiFormStepperComponent', () => {
  let component: MultiFormStepperComponent;
  let fixture: ComponentFixture<MultiFormStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiFormStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiFormStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
