import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOrderStatusPageRoutingModule } from './job-order-status-routing.module';

import { JobOrderStatusPage } from './job-order-status.page';
import { FooterPageModule } from '../footer/footer.module';
import { HeaderPageModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOrderStatusPageRoutingModule,
    HeaderPageModule,
    FooterPageModule,
  ],
  declarations: [JobOrderStatusPage]
})
export class JobOrderStatusPageModule { }
