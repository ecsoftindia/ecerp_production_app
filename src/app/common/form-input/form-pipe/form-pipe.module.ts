import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormErrorPipe } from './form-error-message';



@NgModule({
  declarations: [AppFormErrorPipe],
  imports: [
    CommonModule
  ],
  exports: [
    AppFormErrorPipe
  ]
})
export class FormPipeModule { }
