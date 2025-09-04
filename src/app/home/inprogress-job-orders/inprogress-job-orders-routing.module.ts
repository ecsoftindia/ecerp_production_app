import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InprogressJobOrdersPage } from './inprogress-job-orders.page';

const routes: Routes = [
  {
    path: '',
    component: InprogressJobOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InprogressJobOrdersPageRoutingModule {}
