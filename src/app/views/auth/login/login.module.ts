import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { SharedModule } from '../../../core/modules/shared.module';
const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    data: {
      title: 'Login',
      hasBackButton: false,
      hasMenuButton: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
