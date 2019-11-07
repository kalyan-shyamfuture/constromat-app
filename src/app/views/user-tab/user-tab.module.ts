import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTabPage } from './user-tab.page';
import { UserTabRoutingModule } from './user-tab-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabRoutingModule
  ],
  declarations: [UserTabPage]
})
export class UserTabPageModule {}
