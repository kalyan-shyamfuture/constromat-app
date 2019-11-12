import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

/**
 * Generated class for the WhyusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-whyus',
  templateUrl: 'whyus.html',
})
export class WhyusPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhyusPage');
    this.getHeaderData();
  }


  ionViewDidEnter() {
    this.getHeaderData();
  }
  ionViewWillEnter() {
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
