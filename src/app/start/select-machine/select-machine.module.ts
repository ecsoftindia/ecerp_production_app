import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMachinePageRoutingModule } from './select-machine-routing.module';

import { SelectMachinePage } from './select-machine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectMachinePageRoutingModule
  ],
  declarations: [SelectMachinePage]
})
export class SelectMachinePageModule {}
