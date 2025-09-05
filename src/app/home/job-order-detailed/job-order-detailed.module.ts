import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOrderDetailedPageRoutingModule } from './job-order-detailed-routing.module';

import { JobOrderDetailedPage } from './job-order-detailed.page';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOrderDetailedPageRoutingModule,
    HeaderPageModule,
    FooterPageModule,
    MatTabsModule,
    MatMenuModule
  ],
  declarations: [JobOrderDetailedPage]
})
export class JobOrderDetailedPageModule {}
