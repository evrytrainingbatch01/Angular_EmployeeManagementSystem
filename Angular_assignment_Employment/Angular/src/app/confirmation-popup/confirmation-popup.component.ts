import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(private matDialogRef:MatDialogRef<ConfirmationPopupComponent>) { }

  ngOnInit() {
  }

   onClose(){
     this.matDialogRef.close(false);
  }

}
