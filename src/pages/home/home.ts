import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, LoadingController, Slides } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';
import { environment } from '../../core/global';
import 'rxjs/add/observable/forkJoin';
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  baseimg: any = environment.imageBaseUrl;

  user_id: any;
  isLoggedin: boolean;
  deviceId: any;
  loading: any;
  bannerList:any=[];

  public onlineOffline: boolean = navigator.onLine;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private spinnerDialog: SpinnerDialog,
    public sp: ServicesProvider,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
    this.getHeaderData();
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('logged_user_id');
      this.isLoggedin = true;
      this.deviceId = "";
    }
    else {
      this.user_id = '';
      this.isLoggedin = false;
      this.deviceId = localStorage.getItem('deviceId');
    }

    this.getHomePageData();

  }

  ionViewDidLoad() {
    this.getHeaderData();
    this.menuCtrl.close();
  }
  // ionViewWillEnter() {
  //   this.getHeaderData();
  // }

  // ionViewDidEnter() {
  //   this.getHeaderData();
  // }

  getHomePageData() {
    var forkArray = [];
    // var limit = 15;
    // var pageno = 1;
  
    // var data = {
    //   "cat_id": "",
    //   "product_id": "",
    //   "brand_id": "",
    //   "user_id": this.user_id,
    //   "device_token": this.deviceId
    // }
  
    // var data1 = {
    //   "cat_id": "",
    //   "product_id": "",
    //   "brand_id": "",
    //   "user_id": this.user_id,
    //   "device_token": this.deviceId
    // }
   
  
    forkArray.push(this.sp.getBannerList())
    // forkArray.push(this.sp.getCategoryList())
    // forkArray.push(this.sp.getTopStaples(limit, pageno, data))
    // forkArray.push(this.sp.getDeliverSlotHome())
    // forkArray.push(this.sp.getGeneralList())
    // forkArray.push(this.sp.getCouponList())
    // forkArray.push(this.sp.getBestSellingPro(data1))
    // forkArray.push(this.sp.getCouponList())
    
  
    Observable.forkJoin(forkArray).subscribe(
      (result: any[]) => {
        console.log("Length==>",result.length);
        for (var i = 0; i < result.length; i++) {
          console.log("kalyan");
          if (i == 0) {
            this.bannerList = result[i]['result'];
            console.log("Banner List==>",this.bannerList);
          }

          // if (i == 1) {
          //   this.categoryList = result[i]['result'];
          // }
  
          // if (i == 2) {
          //   this.topProductList = result[i]['result']['data'];
          //   this.topProductList.forEach((x, i) => {
          //     var index = this.customer_cart_data.findIndex(y => y.product_id == x.id &&  y.unit_id == x.meta[0].unit_id);
          //     if (index != -1) {
          //       this.topProductList[i].meta[0].isCart = true;
          //       this.topProductList[i].meta[0].quantity = this.customer_cart_data[index].quantity;
          //     }
          //     else {
          //       this.topProductList[i].meta[0].isCart = false;
          //       this.topProductList[i].meta[0].quantity = 0;
          //     }
          //   })
          // }
          // if (i == 3) {
          //   this.deliveryList = result[i]['result'];
          // }
          // if (i == 4) {
          //   this.generalList = result[i]['result'][0];
          // this.generalListImage = result[i]['result'][0]['quality_gurantee_image'];
          // }
          // if (i == 5) {
          //   this.couponBanner = result[i]['result'];
          // }
          // if (i == 6) {
          //   this.bestSellingList = result[i]['result'];
          //   this.bestSellingList.forEach((x, i) => {
          //     if(x.length > 0) {
          //       var index = this.customer_cart_data.findIndex(y => y.product_id == x[0].id && y.unit_id == x[0].meta[0].unit_id);
          //     if (index != -1) {
          //       this.bestSellingList[i][0].meta[0].isCart = true;
          //       this.bestSellingList[i][0].meta[0].quantity = this.customer_cart_data[index].quantity;
          //     }
          //     else {
          //       this.bestSellingList[i][0].meta[0].isCart = false;
          //       this.bestSellingList[i][0].meta[0].quantity = 0;
          //     }
          //     }
             
          //   })
          // }
          // if (i == 7) {
          //   this.couponBanner = result[i]['result'];
          // }
        }
      },
      err => {
        // this.toastr.error('Something went wrong', '', {
        //   timeOut: 3000,
        // });
      }
    )
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
