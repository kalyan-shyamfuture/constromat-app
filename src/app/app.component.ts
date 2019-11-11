import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Navbar, ToastController, ModalController, MenuController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { environment } from '../core/global';
import { ServicesProvider } from '../core/services/services';

declare var google: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Navbar) navBar: Navbar;
  rootPage: any;

  pages: Array<{ title: string, component: any }>;
  baseimg: any = environment.imageBaseUrl;
  hideBackButton: Boolean = true;
  totalCart: number;
  logged_first_name: any;
  logged_last_name: any;
  logged_user_name: any;
  logged_user_contact_no: any
  logged_user_email: any;
  isLoggedin: boolean;
  isHeaderHidden: any;
  fetchedAddress: any;
  arrayCount: number;
  pinCode: any;
  logged_user_id: any;
  deviceId: any;
  deliveryList: any = [];
  faqList: any = [];
  customsegment:string="HomePage";

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events1: Events,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private device: Device,
    public sp: ServicesProvider,
    public menuCtrl: MenuController,
  ) {
    //this.initializeApp();
    this.platform.ready().then(() => {
      statusBar.styleLightContent();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#9D1212");
      this.deviceId = localStorage.setItem('deviceId', this.device.uuid);
      this.nav.setRoot('HomePage');
      // if (localStorage.getItem('isLoggedin')) {
      //   this.nav.setRoot('HomePage');
      // }
      // else {
      //   this.nav.setRoot('LoginPage');
      // }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.navBar.backButtonClick = (e: UIEvent) => {

        this.nav.pop();
      }

    });

    this.events1.subscribe('hideBackButton', (data) => {
      this.hideBackButton = data;
    });

    this.events1.subscribe('isHeaderHidden', (data) => {
      this.isHeaderHidden = data;
    });

    // sp.getCartNumberStatus.subscribe(status => {
    //   //this.cartNumberStatus(status)
    // });
    sp.getLoginStatus.subscribe(status => this.changeStatus(status));

  }

  menuClose() {
    this.menuCtrl.close();
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.isLoggedin = true;
      this.logged_user_name = localStorage.getItem('logged_user_name');
      this.logged_user_email = localStorage.getItem('logged_user_email');
      this.logged_user_contact_no = localStorage.getItem('logged_user_contact_no');
      this.logged_user_id = localStorage.getItem('logged_user_id');
    }
    else {
      this.isLoggedin = false;
      this.logged_user_name = "Guest";
      this.logged_user_email = "";
      this.logged_user_contact_no = "";
      this.logged_user_id = "";
    }
    if (localStorage.getItem("cart")) {
      this.totalCart = JSON.parse(localStorage.getItem("cart")).length;
    }
    else {
      this.totalCart = 0;
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {   /// add this event
      this.nav.pop();
    };
  }

  // cartNumberStatus(status: boolean) {
  //   if (status) {
  //     if (localStorage.getItem("cart")) {
  //       this.totalCart = JSON.parse(localStorage.getItem("cart")).length;
  //     }
  //     else {
  //       this.totalCart = 0;
  //     }
  //   }
  // }

  // updateLocation(status: boolean) {
  //   if (status) {
  //     this.pinCode = localStorage.getItem('newAddress');
  //   }
  //   else {

  //   }
  // }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  gotoPage(routePage) {
    this.nav.push(routePage);
  }

  gotoCmsPage(id) {
    this.nav.push('CmsPage', { id: id });
  }

  // gotoProductList(routePage) {
  //   this.nav.push(routePage, { id: '' });
  // }

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  goBack() {
      this.nav.pop();
  }

  // goBack() {
  //   if (this.nav.getActive().name == 'OrderdetailsPage') {
  //     this.nav.push('OrdersPage');
  //   }
  //   else {
  //     this.nav.pop();
  //   }
  // }
  // gotoSearchPage(routePage) {
  //   this.nav.push('SearchPage', { keyword: 0 });
  // }


  // getAddress(latLng) {
  //   let geocoder = new google.maps.Geocoder;
  //   geocoder.geocode({ 'location': latLng }, (results, status) => {
  //     this.fetchedAddress = results[0].address_components;
  //     this.pinCode = this.fetchedAddress[0].long_name + ' ' + this.fetchedAddress[1].long_name + ' ' + this.fetchedAddress[2].long_name;
  //     localStorage.setItem('newAddress', this.pinCode);
  //   });
  // }

  // openModal() {
  //   var data = { 'pinCode': this.pinCode };
  //   this.nav.push('UpdatepinPage', data);
  // }
  // getDeliverSlot() {
  //   this.sp.getDeliverSlot().subscribe(
  //     res => {
  //       this.deliveryList = res['result'];
  //     },
  //     error => {
  //     }
  //   )
  // }

  logOut() {
    localStorage.clear();
    this.isLoggedin = false;
    this.logged_user_name = "Guest";
    this.logged_user_email = "";
    this.logged_user_contact_no = "";
    this.logged_user_id = "";
    this.nav.setRoot('LoginPage');
  }


  segmentChanged(event) {
    console.log(event.value);
    this.nav.setRoot(event.value);
  }
  

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  // deliveryListt() {
  //   return this.deliveryList.filter((delivery) => delivery.is_home == 1);
  // }

}
