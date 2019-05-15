import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginVerifyService {
 

  flag:boolean;
  // employeeListButton=false;
  // loginButton=true;
  // logoutButton=false;
  constructor(private formBuilder:FormBuilder) { }

  loginCredentials=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });

  toggling=this.formBuilder.group({
    employeeListButton:[false],
    loginButton:[true],
    logoutButton:[false]
  });
  private home_buttons=new BehaviorSubject<FormGroup>(this.toggling);
          cast=this.home_buttons.asObservable();

   setFlag()
   {
     this.flag=false;
   }

   toggleButtons()
   {
     this.toggling.setValue({
      employeeListButton:false,
      loginButton:true,
      logoutButton:false
     });
     this.home_buttons.next(this.toggling);
   }

  loginVerify():boolean
  {
    console.log(this.loginCredentials.controls['email'].value);
    
    console.log(this.loginCredentials.controls['password'].value);
    console.log(JSON.stringify(this.loginCredentials.value));
    console.log(this.flag);
    if((this.loginCredentials.controls['email'].value=="srinivas@gmail.com") && (this.loginCredentials.controls['password'].value=="srinivas") )
    {

      console.log("if block flag value:"+this.flag);

      this.flag=true;
  //     this.employeeListButton=true;
  // this.loginButton=false;
  // this.logoutButton=true;
  // console.log( this.employeeListButton+" "+this.loginButton+" "+this.logoutButton)
     this.toggling.setValue({
      employeeListButton:true,
      loginButton:false,
      logoutButton:true
     });
     this.home_buttons.next(this.toggling);
    this.loginCredentials.setValue({
      email:'',
      password:''
    });
}
    return this.flag;


  }
}
