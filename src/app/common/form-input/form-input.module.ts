import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from './input-control/input-control.component';
import { NumberControlComponent } from './number-control/number-control.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { SelectSearchPipe } from './select-control/select-search.pipe';
import { TextareaControlComponent } from './textarea-control/textarea-control.component';
import { FormPipeModule } from './form-pipe/form-pipe.module';
import { FormDirectiveModule } from './form-directive/form-directive.module';
import { PasswordControlComponent } from './password-control/password-control.component';
import { LabelControlComponent } from './label-control/label-control.component';
import { EmailControlComponent } from './email-control/email-control.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { IonicModule } from '@ionic/angular';
import { CounterControlComponent } from './counter-control/counter-control.component';
import { PinControlComponent } from './pin-control/pin-control.component';
import { MatSelectControlComponent } from './mat-select-control/mat-select-control.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    InputControlComponent,
    NumberControlComponent,
    SelectControlComponent,
    SelectSearchPipe,
    TextareaControlComponent,
    PasswordControlComponent,
    LabelControlComponent,
    EmailControlComponent,
    FileUploadComponent,
    CounterControlComponent,
    PinControlComponent,
    MatSelectControlComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MatSelectModule,
    // MatRippleModule,
    // MatSelectModule,

    // DateControlModule,
    FormPipeModule,
    FormDirectiveModule,
    IonicModule
    // MatTooltipModule,
    // MatInputModule,
    // TextEditorModule,
    // NgxMatSelectSearchModule
  ],
  exports: [
    FormsModule,
    InputControlComponent,
    NumberControlComponent,
    SelectControlComponent,
    CounterControlComponent,
    MatSelectControlComponent,
    // DateControlModule,
    TextareaControlComponent,
    PasswordControlComponent,
    LabelControlComponent,
    EmailControlComponent,
    FileUploadComponent,
    PinControlComponent
    // MatInputModule,
    // NgxMatSelectSearchModule ,
    // TextEditorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class FormInputModule { }
