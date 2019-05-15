import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalFormComponent } from './final-form.component';

describe('FinalFormComponent', () => {
  let component: FinalFormComponent;
  let fixture: ComponentFixture<FinalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
