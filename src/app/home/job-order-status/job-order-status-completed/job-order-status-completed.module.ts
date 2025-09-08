import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOrderStatusCompletedPageRoutingModule } from './job-order-status-completed-routing.module';

import { JobOrderStatusCompletedPage } from './job-order-status-completed.page';
import { FooterPageModule } from '../../footer/footer.module';
import { HeaderPageModule } from '../../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOrderStatusCompletedPageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  declarations: [JobOrderStatusCompletedPage]
})
export class JobOrderStatusCompletedPageModule { }
