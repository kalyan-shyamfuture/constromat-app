import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnquirePage } from './enquire';

import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [
    EnquirePage,
  ],
  imports: [
    IonicPageModule.forChild(EnquirePage),
    CoreModule
  ],
})
export class EnquirePageModule {}
