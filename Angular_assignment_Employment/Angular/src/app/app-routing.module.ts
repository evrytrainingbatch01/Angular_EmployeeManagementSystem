import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiFormStepperComponent } from './multi-form-stepper/multi-form-stepper.component';
import { VideoPlayComponent } from './video-play/video-play.component';
import { ListOfEmployeesComponent } from './list-of-employees/list-of-employees.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SessionTimeoutPopupComponent } from './session-timeout-popup/session-timeout-popup.component';

const routes: Routes = [
  {path:"multi-form",component:MultiFormStepperComponent},
  {path:"listofemployees",component:ListOfEmployeesComponent},
  {path:"login-form",component:LoginComponent},
  {path:"session-timeout",component:SessionTimeoutPopupComponent},
   {path:"home",component:VideoPlayComponent},
  {path:"",redirectTo:"home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingCoomponents=[MultiFormStepperComponent,SessionTimeoutPopupComponent];