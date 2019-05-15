import { Component, OnInit } from '@angular/core';
import { LoginVerifyService } from '../shared/login/login-verify.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {SessionTimeoutService} from '../shared/session/session-timeout.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  flag:boolean;
  constructor(private loginVerifyService:LoginVerifyService
    ,private router:Router
    ,private translateService:TranslateService
    ,private sessionTimeoutService:SessionTimeoutService) { }

  loginForm=this.loginVerifyService.loginCredentials;
  ngOnInit() {
    console.log("Hello.. it's ngOnInit() method of login component");
    this.loginVerifyService.setFlag();
    this.loginVerifyService.toggleButtons();
  }

  loginVerify()
  {
    this.flag=this.loginVerifyService.loginVerify();
    console.log(this.flag);
    if(this.flag)
    {
      // document.getElementById("status").innerHTML="you have been successfully logged in";
      this.router.navigate(['/home']);
      console.log("calling session idle time method of session service");
      this.sessionTimeoutService.setIdleTime();
      console.log("session idel method is completed");
      

      //session time out funtioin needs to  be called
    }
    else{
      document.getElementById("status").innerHTML=this.translateService.instant('login.status');
    }
  }

}
