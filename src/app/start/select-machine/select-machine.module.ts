import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMachinePageRoutingModule } from './select-machine-routing.module';

import { SelectMachinePage } from './select-machine.page';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectMachinePageRoutingModule,
    FormInputModule
  ],
  declarations: [SelectMachinePage]
})
export class SelectMachinePageModule { }
