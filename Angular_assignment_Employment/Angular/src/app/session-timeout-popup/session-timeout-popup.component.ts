import { Component, OnInit } from '@angular/core';
import { SessionTimeoutService } from '../shared/session/session-timeout.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-session-timeout-popup',
  templateUrl: './session-timeout-popup.component.html',
  styleUrls: ['./session-timeout-popup.component.css']
})
export class SessionTimeoutPopupComponent implements OnInit {

  constructor(private sessionTimeoutService:SessionTimeoutService
    ,private translateService:TranslateService) { }

  idleState:string;
  countdown:number;
  
  

  ngOnInit() {

    this.sessionTimeoutService.countDownCast.subscribe(
      result=>{
               this.countdown=result;
               console.log(this.countdown);
               this.idleState=this.translateService.instant('session.idle.popup.message1')+this.countdown+this.translateService.instant('session.idel.popup.message2');
      }
    );
  }
  
   extendSession()
   {
     this.sessionTimeoutService.extendSession();
   }
   closeSession()
   {
     this.sessionTimeoutService.closeSession();
   }
  

}
