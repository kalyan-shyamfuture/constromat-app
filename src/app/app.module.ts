import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen} from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// core module
import { CoreModule } from '../../src/core/core.module';

import { Device } from '@ionic-native/device';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    CoreModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
  ]
})
export class AppModule {}
