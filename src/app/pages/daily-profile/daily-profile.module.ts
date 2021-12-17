import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyProfilePageRoutingModule } from './daily-profile-routing.module';

import { DailyProfilePage } from './daily-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyProfilePageRoutingModule
  ],
  declarations: [DailyProfilePage]
})
export class DailyProfilePageModule {}
