import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';
import { SharedModule } from '../../../core/modules/shared.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    data: {
      title: 'Register',
      hasBackButton: false,
      hasMenuButton: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
