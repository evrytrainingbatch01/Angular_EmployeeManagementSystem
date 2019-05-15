import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private matSnackBar:MatSnackBar) { }

  matSnackBarConfig:MatSnackBarConfig={
    duration:6000,
    horizontalPosition:"end",

    verticalPosition:"top"
  }
  success(msg)
  {
    this.matSnackBarConfig['panelClass']=['success'];
    this.matSnackBar.open(msg,'',this.matSnackBarConfig);
  }

  failure(msg)
  {
    this.matSnackBarConfig['panelClass']=['failure'];
    this.matSnackBar.open(msg,'',);
  }

  delete(msg)
  {
    this.matSnackBarConfig['panelClass']=['delete'];
    this.matSnackBar.open(msg,'',this.matSnackBarConfig);
  }
  error(msg)
  {
    this.matSnackBarConfig['panelClass']=['error'];
    this.matSnackBar.open(msg,'',this.matSnackBarConfig);
  }
}
