import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { DatePipe } from '@angular/common';
import { HttpHeaders ,HttpClient} from '@angular/common/http';
import { EmployeeWrapper } from '../models/employeeWrapper.model';
import { Observable } from 'rxjs';
import { EmployeeResponseWrapper } from '../models/employeeResponseWrapper.model';
import {LocalStorageService} from 'ngx-webstorage';
import { EmployeeIds } from '../models/employeeIds.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeDetails:Employee=new Employee();
  date=new Date();
  maxDate=new Date(this.date.getUTCFullYear(),this.date.getUTCMonth(),this.date.getUTCDate());
  flag:boolean=true;
   employeeId;
  constructor(private _datePipe:DatePipe,private formBuilder: FormBuilder,private httpClient:HttpClient
    ,private localStorage:LocalStorageService) { }

  employee=this.formBuilder.group({
   
  employeeBasicDetails:this.formBuilder.group({
    // $key:[null],
    fullName:['',[Validators.required,Validators.maxLength(30),Validators.pattern('[a-zA-Z ]*')]],
    dateOfBirth:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    employeeType:['',Validators.required],
    }),

    
    employeeMoreDetails:this.formBuilder.group({
      hireDate:['',Validators.required],
      gender:['',Validators.required],
      department:['',Validators.required],
      // address:['',Validators.required],
      maritalStatus:['']
    })

  });

    form3:FormGroup=new FormGroup({
      id:new FormControl(null),
      fullName:new FormControl(''),
      dateOfBirth:new FormControl(''),
      email:new FormControl(''),
      mobile:new FormControl(''),
      employeeType:new FormControl(''),
      hireDate:new FormControl(''),
      gender:new FormControl(''),
      department:new FormControl(''),
      // address:new FormControl(''),
      maritalStatus:new FormControl('')
    });
initializeFormGroup1()
{
  console.log("entered values reset funtion");
  this.employee.controls['employeeBasicDetails'].setValue(
    {
      
      fullName:'',
      dateOfBirth:'',
      email:'',
      mobile:'',
      employeeType:'',
      
  
    }
  );
  console.log("exited value reset function")
}

initializeFormGroup2()
{
  console.log("entered values reset funtion");
  this.employee.controls['employeeMoreDetails'].setValue(
    {
      
      hireDate:'',
      gender:'1',
      department:0,
      // address:'',
      maritalStatus:''
  
    }
  );
  console.log("exited value reset function")
}

initializeFormGroup3()
 {
   
 console.log("entered into group3 initialization");
//   console.log(this.form1.value.fullName);
   
  this.form3.setValue(
   {
    id:null,
  fullName:this.employee.controls['employeeBasicDetails'].value.fullName,
    dateOfBirth:this.employee.controls['employeeBasicDetails'].value.dateOfBirth,
    email:this.employee.controls['employeeBasicDetails'].value.email,
    mobile:this.employee.controls['employeeBasicDetails'].value.mobile,
   employeeType:this.employee.controls['employeeBasicDetails'].value.employeeType,
    hireDate:this.employee.controls['employeeMoreDetails'].value.hireDate,
  gender:this.employee.controls['employeeMoreDetails'].value.gender,
  department:this.employee.controls['employeeMoreDetails'].value.department,
//  address:this.employee.controls['employeeMoreDetails'].value.address,
  maritalStatus:this.employee.controls['employeeMoreDetails'].value.maritalStatus
  
  }

    
 );



 console.log("exited value reset function")
}

 addEmployee():Observable<EmployeeWrapper>
 {
   console.log("requsting reaching addemployee() method instead of editEmploye()");
   alert(JSON.stringify(this.employee.value))
   console.log(this.form3.value.fullName);
   this.employeeDetails.id=null;
this.employeeDetails.employeeBasicDetails.fullName=this.form3.value.fullName;
this.employeeDetails.employeeBasicDetails.dateOfBirth=this._datePipe.transform(this.form3.value.dateOfBirth,'yyyy-MM-dd');
this.employeeDetails.employeeBasicDetails.email=this.form3.value.email;
this.employeeDetails.employeeBasicDetails.mobile=this.form3.value.mobile;
this.employeeDetails.employeeBasicDetails.employeeType=this.form3.value.employeeType;
this.employeeDetails.employeeMoreDetails.hireDate=this._datePipe.transform(this.form3.value.hireDate,'yyyy-MM-dd');
this.employeeDetails.employeeMoreDetails.gender=this.form3.value.gender;
this.employeeDetails.employeeMoreDetails.department=this.form3.value.department;
// this.employeeDetails.employeeMoreDetails.address=this.form3.value.address;
this.employeeDetails.employeeMoreDetails.maritalStatus=this.form3.value.maritalStatus;
 alert(JSON.stringify(this.employeeDetails));

 return this.httpClient.post<EmployeeWrapper>("http://localhost:9000/addEmployee",this.employeeDetails,{
  headers: new HttpHeaders({
 'Content-Type':'application/json'
   })
  });


}

 initializeForm3OnEdit(row)
 {
  

  this.employee.controls['employeeBasicDetails'].setValue(
    {
      fullName:row.employeeBasicDetails.fullName,
      dateOfBirth:new Date(row.employeeBasicDetails.dateOfBirth),
      email:row.employeeBasicDetails.email,
      mobile:row.employeeBasicDetails.mobile,
      employeeType:row.employeeBasicDetails.employeeType

    }
  );

  this.employee.controls['employeeMoreDetails'].setValue(
    {
      hireDate:new Date(row.employeeMoreDetails.hireDate),
      gender:row.employeeMoreDetails.gender,
      department:row.employeeMoreDetails.department,
      // address:row.employeeMoreDetails.address,
      maritalStatus:row.employeeMoreDetails.maritalStatus
    }
  );
  // this.employeeId=row.id;
  // console.log(this.employeeId);


  // this.form3.setValue(
  //   {
  //    id:row.id,
  //  fullName:this.employee.controls['employeeBasicDetails'].value.fullName,
  //    dateOfBirth:this._datePipe.transform(this.employee.controls['employeeBasicDetails'].value.dateOfBirth,'dd/MM/yyyy'),
  //    email:this.employee.controls['employeeBasicDetails'].value.email,
  //    mobile:this.employee.controls['employeeBasicDetails'].value.mobile,
  //   employeeType:this.employee.controls['employeeBasicDetails'].value.employeeType,
  //    hireDate:this._datePipe.transform(this.employee.controls['employeeMoreDetails'].value.hireDate,'dd/MM/yyyy'),
  //  gender:this.employee.controls['employeeMoreDetails'].value.gender,
  //  department:this.employee.controls['employeeMoreDetails'].value.department,
  // address:this.employee.controls['employeeMoreDetails'].value.address,
  //  jobLocation:this.employee.controls['employeeMoreDetails'].value.jobLocation
   
  //  }
 
     
  // );

  
  // console.log(this.form3.value);
 }


getEmployeeList():Observable<any>
{
  return this.httpClient.get("http://localhost:9000/getEmployeeList");
}

deleteEmployee(row):Observable<any>
{
  console.log(row.id);
   return this.httpClient.delete("http://localhost:9000/deleteEmployee/"+row.id);
}

deleteEmployees(ids:EmployeeIds)
{
  console.log(JSON.stringify(ids));
 return this.httpClient.post("http://localhost:9000/deleteEmployees",ids,{
   headers: new HttpHeaders({
  'Content-Type':'application/json'
    })
  });
}

initializeFormOnCreate()
{
  this.form3.reset();
  this.initializeFormGroup1();
  this.initializeFormGroup2();
}

editEmployee():Observable<any>
{
   
  // alert(JSON.stringify(this.employee.value))
  // console.log(this.form3.value.fullName);
  this.employeeDetails.id=this.localStorage.retrieve("employeeId");
  console.log("id of employeee"+this.employeeDetails.id);
 this.employeeDetails.employeeBasicDetails.fullName=this.form3.value.fullName;
 this.employeeDetails.employeeBasicDetails.dateOfBirth=this._datePipe.transform(this.form3.value.dateOfBirth,'yyyy-MM-dd'),
 this.employeeDetails.employeeBasicDetails.email=this.form3.value.email;
this.employeeDetails.employeeBasicDetails.mobile=this.form3.value.mobile;
this.employeeDetails.employeeBasicDetails.employeeType=this.form3.value.employeeType;
this.employeeDetails.employeeMoreDetails.hireDate=this._datePipe.transform(this.form3.value.hireDate,'yyyy-MM-dd'),
 this.employeeDetails.employeeMoreDetails.gender=this.form3.value.gender;
 this.employeeDetails.employeeMoreDetails.department=this.form3.value.department;
//  this.employeeDetails.employeeMoreDetails.address=this.form3.value.address;
 this.employeeDetails.employeeMoreDetails.maritalStatus=this.form3.value.maritalStatus;
 alert(JSON.stringify(this.employeeDetails));
 
 return this.httpClient.put("http://localhost:9000/editEmployee",this.employeeDetails,{
  headers: new HttpHeaders({
 'Content-Type':'application/json'
   })
  });
  
}

}
