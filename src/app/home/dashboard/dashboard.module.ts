import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { HeaderPageModule } from '../header/header.module';
import { FooterPageModule } from '../footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
