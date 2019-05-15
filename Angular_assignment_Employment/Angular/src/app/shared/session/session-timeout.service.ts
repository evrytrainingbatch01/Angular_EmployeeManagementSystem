import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SessionTimeoutPopupComponent } from 'src/app/session-timeout-popup/session-timeout-popup.component';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {

  constructor(private idle: Idle, private keepalive: Keepalive
    ,private router:Router
    ,private matDialog:MatDialog) { }

    countDownTime:number;
    flag:boolean=true;
    private timeOutCount=new BehaviorSubject<number>(this.countDownTime);
    countDownCast=this.timeOutCount.asObservable();

  setIdleTime()
  {

    console.log("entered into setideltime method of service");
     // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(60);
     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
     this.idle.setTimeout(30);
     this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

     this.idle.onTimeoutWarning.subscribe(
       (countdown) =>{
        //  console.log("before countdown assign");
          this.countDownTime=countdown;
          this.timeOutCount.next(this.countDownTime);
          // console.log("after countdown assign");
          // console.log(this.countDownTime);
          // console.log("before routing");
           this.router.navigate(['/session-timeout']);
            
          // if(this.flag)
          // {
          //  const dialogueConfig:MatDialogConfig=new MatDialogConfig();
          //  dialogueConfig.disableClose=true;
          // dialogueConfig.autoFocus=true;
          //  dialogueConfig.width="80%";
          // dialogueConfig.height="90%";
          //  this.matDialog.open(SessionTimeoutPopupComponent,dialogueConfig);
          //  this.flag=false;
          // }
          // console.log("after routing");
       }
     );

     this.idle.onTimeout.subscribe(() => {
          this.router.navigate(['/login-form']);
    });
     console.log("end of method");
      this.reset();
      }

      reset() {
        this.idle.watch();
        // this.idleState = 'Started.';
        // this.timedOut = false;
      }

      extendSession()
      {
        this.router.navigate(['/listofemployees']);
        this.reset();
      }
      
      closeSession()
      {
        this.router.navigate(['/login-form']);
      }
}
