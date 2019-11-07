import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTabPage } from './user-tab.page';
// import { AuthGuardService } from '../../core/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: UserTabPage,
    children: [
      {
        path: '',
        redirectTo: '/user/home',
        pathMatch: 'full'
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            loadChildren: './product/product.module#ProductPageModule'
          },
          {
            path: 'details',
            loadChildren: './productdetails/productdetails.module#ProductdetailsPageModule'
          },
        ]
      },
      { path: 'home', loadChildren: './home/home.module#HomePageModule' },
      { path: 'enquiry', loadChildren: './enquiry/enquiry.module#EnquiryPageModule' },
      { path: 'callus', loadChildren: './callus/callus.module#CallusPageModule' }
    ]
  },
 
  // ,
  // { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTabRoutingModule { }
