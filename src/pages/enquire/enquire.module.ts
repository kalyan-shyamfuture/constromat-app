import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnquirePage } from './enquire';

@NgModule({
  declarations: [
    EnquirePage,
  ],
  imports: [
    IonicPageModule.forChild(EnquirePage),
  ],
})
export class EnquirePageModule {}
