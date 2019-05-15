import { Component, OnInit } from '@angular/core';
import { InternationalizationService } from '../shared/internationalisation/internationalization.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoginVerifyService } from '../shared/login/login-verify.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  buttons:FormGroup;
  employeeListButton;
  loginButton;
  logoutButton;
  // employeeListButton=this.loginVerifyService.toggling.controls['employeeListButton'].value;
  // loginButton=this.loginVerifyService.toggling.controls['loginButton'].value;
  // logoutButton=this.loginVerifyService.toggling.controls['logoutButton'].value;
  
  constructor(private internationalizationService:InternationalizationService
    ,private matDialog:MatDialog
    ,private loginVerifyService:LoginVerifyService) { 
      // this.employeeListButton=this.loginVerifyService.employeeListButton;
      // this.loginButton=this.loginVerifyService.loginButton;
      // this.logoutButton=this.loginVerifyService.logoutButton;
      // console.log("updated value--- "+this.employeeListButton +"  "+ this.loginButton +" "+ this.logoutButton );
    }

  ngOnInit() {
    this.loginVerifyService.cast.subscribe(
      result=>{
         this.buttons=result;
        this.employeeListButton=this.buttons.controls['employeeListButton'].value;
  this.loginButton=this.buttons.controls['loginButton'].value;
  this.logoutButton=this.buttons.controls['logoutButton'].value;
      }
    );


  }

  switchLanguage(language: string) {

    console.log(language);
    this.internationalizationService.switchLanguage(language);

  }

  openLoginForm()
  {
    const dialogueConfig:MatDialogConfig=new MatDialogConfig();
    dialogueConfig.disableClose=true;
    dialogueConfig.autoFocus=true;
    dialogueConfig.width="80%";
    dialogueConfig.height="90%";
    this.matDialog.open(LoginComponent,dialogueConfig).afterClosed()
     .subscribe(
       returnControl=>{
         console.log(returnControl);
        
         
         

       }
     );
  }

}
