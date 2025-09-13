import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginWithPage } from './login-with.page';

const routes: Routes = [
  {
    path: '',
    component: LoginWithPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginWithPageRoutingModule {}
