import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFunctionalityNavbarComponent } from './emp-functionality-navbar.component';

describe('EmpFunctionalityNavbarComponent', () => {
  let component: EmpFunctionalityNavbarComponent;
  let fixture: ComponentFixture<EmpFunctionalityNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpFunctionalityNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpFunctionalityNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
