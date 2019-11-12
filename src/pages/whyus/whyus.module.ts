import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhyusPage } from './whyus';
//core module
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [
    WhyusPage,
  ],
  imports: [
    IonicPageModule.forChild(WhyusPage),
    CoreModule
  ],
})
export class WhyusPageModule {}
