import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events} from 'ionic-angular';

/**
 * Generated class for the AftersplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aftersplash',
  templateUrl: 'aftersplash.html',
})
export class AftersplashPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    ) {
      this.getHeaderData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AftersplashPage');
  }
  ionViewDidEnter() {
    this.getHeaderData();
  }
  ionViewWillEnter() {
    this.getHeaderData();
  }

  gotoPage(page) {
    this.navCtrl.setRoot(page);
  }

  getHeaderData() {
    this.events.publish(
      "headerData",{
        "isHeaderHidden": true,
        "isSubHeaderHidden":false,
        "hideBackButton": true,
        "title":"Splash Page"
      }
    );
  }


}
