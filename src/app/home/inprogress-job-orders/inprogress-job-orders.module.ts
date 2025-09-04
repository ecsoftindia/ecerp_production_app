import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InprogressJobOrdersPageRoutingModule } from './inprogress-job-orders-routing.module';

import { InprogressJobOrdersPage } from './inprogress-job-orders.page';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InprogressJobOrdersPageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  declarations: [InprogressJobOrdersPage]
})
export class InprogressJobOrdersPageModule {}
