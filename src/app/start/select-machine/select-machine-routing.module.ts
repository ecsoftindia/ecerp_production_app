import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectMachinePage } from './select-machine.page';

const routes: Routes = [
  {
    path: '',
    component: SelectMachinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectMachinePageRoutingModule {}
