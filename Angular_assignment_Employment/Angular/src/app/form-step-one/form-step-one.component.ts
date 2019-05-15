import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import {NotificationsService} from '../shared/notification/notifications.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-step-one',
  templateUrl: './form-step-one.component.html',
  styleUrls: ['./form-step-one.component.css']
})
export class FormStepOneComponent implements OnInit {

  constructor(private service:EmployeeService,private notificationService:NotificationsService
    ,private translateService:TranslateService) { }
  empTypes:string[]=[this.translateService.instant('first.form.employeetype.option1'),this.translateService.instant('first.form.employeetype.option2')];
  stepOneForm=this.service.employee.controls['employeeBasicDetails'];
  



  ngOnInit() {
    
  }

  // dateCheck()
  // {
  //   this.maxdate1=new Date(2019,3,28);
  //   this.date=new Date();
  //   console.log(this.maxdate1);
  //   console.log(this.date);
  //   console.log(this.date.getDay());
  //   console.log(this.date.getUTCFullYear());
  //   console.log(this.date.getUTCMonth());
  //   console.log(this.date.getUTCDate());


  // }

  formReset()
  {
    this.service.employee.controls['employeeBasicDetails'].reset();
    this.service.initializeFormGroup1();
    
  }
}
