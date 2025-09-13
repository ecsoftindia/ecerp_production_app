import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeCustomerPage } from './change-customer.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeCustomerPageRoutingModule {}
