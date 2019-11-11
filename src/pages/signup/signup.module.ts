import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
//core module
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    CoreModule
  ],
})
export class SignupPageModule {}
