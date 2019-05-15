import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MatDialogRef } from '@angular/material';
import {LocalStorageService} from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-multi-form-stepper',
  templateUrl: './multi-form-stepper.component.html',
  styleUrls: ['./multi-form-stepper.component.css']
})
export class MultiFormStepperComponent implements OnInit {

  
  constructor(private _formBuilder: FormBuilder,private employeeService:EmployeeService
    ,private dialogRef:MatDialogRef<MultiFormStepperComponent>
    ,private localStorage:LocalStorageService
    ,private translateService:TranslateService) {}
    employee_id=this.localStorage.retrieve("employeeId");
    employeeForm=this.translateService.instant('employee-form');
    employeeEditForm=this.translateService.instant('employee-edit-form');
  ngOnInit() {

  }

  onClose()
  {
    this.localStorage.store("employeeId","");
    this.dialogRef.close();
  }

}
