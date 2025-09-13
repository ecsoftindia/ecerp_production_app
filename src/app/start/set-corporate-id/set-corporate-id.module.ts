import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetCorporateIdPageRoutingModule } from './set-corporate-id-routing.module';

import { SetCorporateIdPage } from './set-corporate-id.page';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetCorporateIdPageRoutingModule,
    FormInputModule
  ],
  declarations: [SetCorporateIdPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SetCorporateIdPageModule {}
