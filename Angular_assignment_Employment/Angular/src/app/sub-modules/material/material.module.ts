import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material.MatToolbarModule,
    material.MatGridListModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatRadioModule,
    material.MatSelectModule,
    material.MatDatepickerModule,
    material.MatNativeDateModule,
    material.MatCheckboxModule,
    material.MatButtonModule,
    material.MatTableModule,
    material.MatIconModule,
    material.MatPaginatorModule,
    material.MatSortModule,
    material.MatDialogModule,
    material.MatSnackBarModule,
    material.MatTooltipModule,
    material.MatCardModule
      ],
   exports: [
     material.MatToolbarModule,
     material.MatGridListModule,
     material.MatFormFieldModule,
     material.MatInputModule,
     material.MatRadioModule,
     material.MatSelectModule,
     material.MatDatepickerModule,
     material.MatNativeDateModule,
     material.MatCheckboxModule,
     material.MatButtonModule,
     material.MatTableModule,
     material.MatIconModule,
     material.MatPaginatorModule,
     material.MatSortModule,
     material.MatDialogModule,
     material.MatSnackBarModule,
     material.MatTooltipModule,
     material.MatCardModule
   ]
})
export class MaterialModule { }
