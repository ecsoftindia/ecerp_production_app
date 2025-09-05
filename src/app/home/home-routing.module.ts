import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
    ]
  },  {
    path: 'inprogress-job-orders',
    loadChildren: () => import('./inprogress-job-orders/inprogress-job-orders.module').then( m => m.InprogressJobOrdersPageModule)
  },
  {
    path: 'job-order-detailed',
    loadChildren: () => import('./job-order-detailed/job-order-detailed.module').then( m => m.JobOrderDetailedPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'select-machine',
    loadChildren: () => import('./select-machine/select-machine.module').then( m => m.SelectMachinePageModule)
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
