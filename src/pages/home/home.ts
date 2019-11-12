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
    //this.createLoader();
    // this.events.publish(
    //   "headerData", {
    //     "isHeaderHidden": false,
    //     "isSubHeaderHidden":false,
    //     "hideBackButton": true,
    //     "title":" Welcome to Constromat"
    //   }
    // );
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

  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }
  ionViewWillEnter() {
    this.getHeaderData();
  }

  ionViewDidEnter() {
    this.getHeaderData();
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
