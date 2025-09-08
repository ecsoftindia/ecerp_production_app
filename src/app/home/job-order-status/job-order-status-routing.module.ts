import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobOrderStatusPage } from './job-order-status.page';

const routes: Routes = [
  {
    path: '',
    component: JobOrderStatusPage
  },
 

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOrderStatusPageRoutingModule {}
