import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginWithPageRoutingModule } from './login-with-routing.module';

import { LoginWithPage } from './login-with.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginWithPageRoutingModule
  ],
  declarations: [LoginWithPage]
})
export class LoginWithPageModule {}
