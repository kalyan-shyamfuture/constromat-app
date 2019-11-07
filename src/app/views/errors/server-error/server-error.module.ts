import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServerErrorPage } from './server-error.page';

const routes: Routes = [
  {
    path: '',
    component: ServerErrorPage,
    data: {
      title: '500 Internal Server Error!',
      hasBackButton: true,
      hasMenuButton: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServerErrorPage]
})
export class ServerErrorPageModule {}
