import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule,routingCoomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VideoPlayComponent } from './video-play/video-play.component';
import { MultiFormStepperComponent } from './multi-form-stepper/multi-form-stepper.component';
import { EmpFunctionalityNavbarComponent } from './emp-functionality-navbar/emp-functionality-navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatNativeDateModule,MatIconModule, MatDialogRef} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MaterialModule} from './sub-modules/material/material.module';
import {FormStepOneComponent} from './form-step-one/form-step-one.component';
import {FormStepTwoComponent} from './form-step-two/form-step-two.component';
import {FinalFormComponent} from './final-form/final-form.component';
import { HomeComponent } from './home/home.component';
import { ListOfEmployeesComponent } from './list-of-employees/list-of-employees.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter'
import {NgxPaginationModule} from 'ngx-pagination';
import {DatePipe} from '@angular/common';
import { EmployeeService } from './shared/employee.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {NotificationsService} from './shared/notification/notifications.service';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';

import { DigitOnlyDirective } from './directives/digit-only.directive';



import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './login/login.component';
import { LoginVerifyService } from './shared/login/login-verify.service';
import { SessionTimeoutPopupComponent } from './session-timeout-popup/session-timeout-popup.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SessionTimeoutService } from './shared/session/session-timeout.service';

export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http);

}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VideoPlayComponent,
    MultiFormStepperComponent,
    EmpFunctionalityNavbarComponent,
    routingCoomponents,
    FinalFormComponent,
    FormStepTwoComponent,
    FormStepOneComponent,
    HomeComponent,
    ListOfEmployeesComponent,
    EditEmployeeComponent,
    ConfirmationPopupComponent,
   
    DigitOnlyDirective,
   
    LoginComponent,
   
    SessionTimeoutPopupComponent,
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MaterialModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    TranslateModule.forRoot({

      loader: {

        provide: TranslateLoader,

        useFactory: HttpLoaderFactory,

        deps: [HttpClient]

      }

    })
  ],
  providers: [DatePipe,EmployeeService,NotificationsService,LoginVerifyService,SessionTimeoutService],
  bootstrap: [AppComponent],
  entryComponents:[MultiFormStepperComponent,ConfirmationPopupComponent,LoginComponent]
})
export class AppModule { }
