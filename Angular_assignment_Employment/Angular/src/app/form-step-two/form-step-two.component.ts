import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-step-two',
  templateUrl: './form-step-two.component.html',
  styleUrls: ['./form-step-two.component.css']
})
export class FormStepTwoComponent implements OnInit {

  constructor(private service:EmployeeService
    ,private translateService:TranslateService) { }

  departments=[
    {id:1,value:this.translateService.instant('step2.department.option1')},
    {id:2,value:this.translateService.instant('step2.department.option2')},
    {id:3,value:this.translateService.instant('step2.department.option3')}
  ];
  locations:string[]=[this.translateService.instant("second.form.joblocation.option1"),this.translateService.instant("second.form.joblocation.option2"),this.translateService.instant("second.form.joblocation.option3"),this.translateService.instant("second.form.joblocation.option4")];
  stepTwoForm=this.service.employee.controls['employeeMoreDetails'];
  maxDate=this.service.maxDate;

  ngOnInit() {
  }

  
  initializeForm3(){
     this.service.initializeFormGroup3();
  }

  formReset()
  {
    this.service.employee.value.employeeMoreDetails.reset();
    this.service.initializeFormGroup2();
    
    
  }

}
