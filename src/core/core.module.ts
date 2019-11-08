import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { ApiProvider } from '../core/api/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FooterPageModule } from '../pages/include/footer/footer.module';
import { IonicStepperModule } from 'ionic-stepper';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer} from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ServicesProvider } from './services/services';
import { Keyboard } from '@ionic-native/keyboard';


@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ionicGalleryModal.GalleryModalModule,
    IonicStepperModule,
    FooterPageModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    IonicStepperModule,
    FooterPageModule
  ],
  declarations: [
  ],
  providers: [
    ApiProvider,
    SpinnerDialog,
    File,
    Transfer,
    Camera,
    FilePath,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    FileTransfer,
    FileTransferObject,
    CallNumber,
    EmailComposer,
    InAppBrowser,
    Keyboard

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ServicesProvider,
      ]
    }
  }
}
