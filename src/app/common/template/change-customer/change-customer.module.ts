import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCustomerPageRoutingModule } from './change-customer-routing.module';

import { ChangeCustomerPage } from './change-customer.page';
import { HeaderPageModule } from 'src/app/home/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderPageModule
  ],
  declarations: [ChangeCustomerPage],
  exports:[ChangeCustomerPage]
})
export class ChangeCustomerPageModule {}
