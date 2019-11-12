import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AftersplashPage } from './aftersplash';

//core module
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [
    AftersplashPage,
  ],
  imports: [
    IonicPageModule.forChild(AftersplashPage),
    CoreModule
  ],
})
export class AftersplashPageModule {}
