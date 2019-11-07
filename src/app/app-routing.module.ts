import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  NoAuthGuard
} from './core/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./views/auth/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/user/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    loadChildren: () => import('./views/errors/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'server-error',
    loadChildren: () => import('./views/errors/server-error/server-error.module').then( m => m.ServerErrorPageModule)
  },
  { path: 'user-tab', loadChildren: './views/user-tab/user-tab.module#UserTabPageModule' },
  // Wild Card Routes
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
