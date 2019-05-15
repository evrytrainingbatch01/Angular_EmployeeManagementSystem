import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../models/employee.model';
import { EmployeeWrapper } from '../models/employeeWrapper.model';
import { MatDialogRef } from '@angular/material';
import {LocalStorageService} from 'ngx-webstorage';
import {NotificationsService} from '../shared/notification/notifications.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-final-form',
  templateUrl: './final-form.component.html',
  styleUrls: ['./final-form.component.css']
})
export class FinalFormComponent implements OnInit {

  constructor(private service:EmployeeService,private dialogRef:MatDialogRef<FinalFormComponent>
    ,private localStorage:LocalStorageService
    ,private notificationService:NotificationsService
    ,private translateService:TranslateService) { }
 // empTypes:string[]=["Permanent","Contract"];
 empTypes:string[]=[this.translateService.instant('first.form.employeetype.option1'),this.translateService.instant('first.form.employeetype.option2')];
 departments=[
  {id:1,value:this.translateService.instant('step2.department.option1')},
  {id:2,value:this.translateService.instant('step2.department.option2')},
  {id:3,value:this.translateService.instant('step2.department.option3')}
];
  //locations:string[]=["Hyderabad","Banglore","Chennai","Mumbai"];
  locations:string[]=[this.translateService.instant("second.form.joblocation.option1"),this.translateService.instant("second.form.joblocation.option2"),this.translateService.instant("second.form.joblocation.option3"),this.translateService.instant("second.form.joblocation.option4")];
  employeeDetails:EmployeeWrapper;
  ngOnInit() {

    // this.service.initializeFormGroup3();
  }
  addEmployee()
  {
    if(this.localStorage.retrieve("employeeId")==="")
    {
      console.log("entered into addEmployee section");
     this.service.addEmployee().subscribe(
      (data:EmployeeWrapper) =>{
        if(data!==null)
        {
          console.log(JSON.stringify(data));
          this.employeeDetails=data;
          console.log(this.employeeDetails);
          this.notificationService.success(":: Employee has been added successfully ::");
       }},
       error=>{
         if(error!==null)
         {
              console.log(error);
              this.notificationService.error(":: Something went wrong . please try again");
       }}
     );
   
    // this.service.initializeFormGroup3();
    this.popUpClose();
    
    }
    else{
      console.log("Entered  into editEmployee section");
      this.service.editEmployee().subscribe(
        data=>{
          console.log(data);
          if(data!==null)
          {
            console.log(data);
            this.notificationService.success(":: Employee is updated successfully ::")
          }
        },
        error=>{
          if(error!==null)
          {
               console.log(error);
               this.notificationService.error("! Something went wrong . please try again");
        }}
      );
    }
     this.localStorage.store("employeeId",'');
     this.popUpClose();
  }

  

  

   popUpClose()
   {
    this.service.employee.reset();
   this.dialogRef.close();
 }

}
