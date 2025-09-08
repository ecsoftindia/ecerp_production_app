import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobOrderStatusDetailPage } from './job-order-status-detail.page';

const routes: Routes = [
  {
    path: '',
    component: JobOrderStatusDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOrderStatusDetailPageRoutingModule {}
