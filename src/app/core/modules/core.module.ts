import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IonicStorageModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
