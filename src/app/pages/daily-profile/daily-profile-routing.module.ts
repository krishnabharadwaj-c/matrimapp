import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyProfilePage } from './daily-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DailyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyProfilePageRoutingModule {}
