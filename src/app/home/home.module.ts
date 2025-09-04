import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderPageModule } from './header/header.module';
import { FooterPageModule } from './footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage]
})
export class HomePageModule {}
