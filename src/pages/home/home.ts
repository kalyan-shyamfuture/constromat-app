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
  productList:any;

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
    var data = {
      "product_id": "",
    }
  

   
  
    forkArray.push(this.sp.getBannerList())
    forkArray.push(this.sp.getProductList(data))
    // forkArray.push(this.sp.getTopStaples(limit, pageno, data))

    Observable.forkJoin(forkArray).subscribe(
      (result: any[]) => {
        console.log("Length==>",result.length);
        for (var i = 0; i < result.length; i++) {
          console.log("kalyan");
          if (i == 0) {
            this.bannerList = result[i]['result'];
            console.log("Banner List==>",this.bannerList);
          }

          if (i == 1) {
            this.productList = result[i]['result']['data'];
            console.log("Product List==>",this.productList);
          }

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
