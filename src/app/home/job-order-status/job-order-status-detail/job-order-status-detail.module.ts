import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOrderStatusDetailPageRoutingModule } from './job-order-status-detail-routing.module';

import { JobOrderStatusDetailPage } from './job-order-status-detail.page';
import { FooterPageModule } from '../../footer/footer.module';
import { HeaderPageModule } from '../../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOrderStatusDetailPageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  declarations: [JobOrderStatusDetailPage]
})
export class JobOrderStatusDetailPageModule { }
