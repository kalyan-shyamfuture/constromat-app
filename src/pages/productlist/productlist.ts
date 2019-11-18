import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, MenuController, Events, ModalController, ViewController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';
import { environment } from '../../core/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { trigger, state, style, transition, animate } from '@angular/animations';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage({ segment: 'productlist/:id' })
@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height: '*',
        margin: '*',
        padding: '*',
        visibility: 'visible',
        opacity: '1'
      })),
      state('close', style({
        height: '0px',
        margin: '0px',
        padding: '0px',
        visibility: 'hidden',
        opacity: '0'
      })),
      transition('open <=> close', animate(200))
    ])
  ]
})
export class ProductlistPage {
  baseimg: any = environment.imageBaseUrl;
  allProduct:any=[];
  // public appMenus = [
  //   {
  //     sectionName: 'ACCOUNT',
  //     showAfterLogin: false,
  //     sectionItems: [
  //       {
  //         title: 'Login',
  //         url: '/login',
  //         icon: 'log-in'
  //       },
  //       {
  //         title: 'Register',
  //         url: '/register',
  //         icon: 'person-add'
  //       },
  //     ]
  //   },
  //   {
  //     sectionName: 'MENUS',
  //     showAfterLogin: true,
  //     sectionItems: [
  //       {
  //         title: 'Home',
  //         url: '/user-tab/home',
  //         icon: 'home'
  //       },
  //       {
  //         title: 'Product',
  //         url: '/user-tab/product',
  //         icon: 'notifications'
  //       },
  //       {
  //         title: 'Menu',
  //         url: '/user/menu',
  //         icon: 'menu',
  //         state: 'close',
  //         subMenus: [
  //           {
  //             title: 'Sub Menu 1',
  //             url: '/user/notification',
  //             icon: 'notifications'
  //           },
  //           {
  //             title: 'Sub Menu 2',
  //             url: '/user/notification',
  //             icon: 'notifications',
  //             state: 'close',
  //             subSubMenus: [
  //               {
  //                 title: 'Sub Sub Menu 1',
  //                 url: '/user/notification',
  //                 icon: 'notifications'
  //               },
  //               {
  //                 title: 'Sub Sub Menu 2',
  //                 url: '/user/notification',
  //                 icon: 'notifications'
  //               },
  //             ]
  //           },
  //         ]
  //       },
  //       {
  //         title: 'Profile',
  //         url: '/user/profile',
  //         icon: 'person'
  //       }
  //     ]
  //   },
  //   {
  //     sectionName: 'ACCOUNT',
  //     showAfterLogin: true,
  //     sectionItems: [
  //       {
  //         title: 'Profile',
  //         url: '/profile',
  //         icon: 'person'
  //       }
  //     ]
  //   },
  // ];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public sp: ServicesProvider,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public keyboard: Keyboard
  ) {

  }

  ionViewDidLoad() {
    this.getHeaderData();
    this.productList();
  }

  productList()
  {
    var data = {
      "product_id":""
    } 
    this.sp.getProductList(data).subscribe(
      res => {
        console.log(res);
        if (res['status']) {
          this.allProduct = res['result']['data'];
        //   this.allProduct.forEach((item, index) => {
        //     console.log(item);
        //     if(item.types.length >0 ) {
               
        //     }
        // });
        this.allProduct.forEach((x, i) => {
            this.allProduct[i].state = "close";
        })
        console.log(this.allProduct);
        }
      },
      error => {
      }
    )

  }

  expandClose(event, navItem) {
    navItem.state = (navItem.state === 'open') ? 'close' : 'open';
  }

  gotoProDetails() {
    this.navCtrl.push("EnquirePage");
  }

  getHeaderData() {
    this.events.publish(
      "headerData",{
        "isHeaderHidden": false,
        "isSubHeaderHidden":false,
        "hideBackButton": true,
        "title":" Welcome to Constromat"
      }
    );
  }

}
