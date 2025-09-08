import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobOrderStatusCompletedPage } from './job-order-status-completed.page';

const routes: Routes = [
  {
    path: '',
    component: JobOrderStatusCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOrderStatusCompletedPageRoutingModule {}
