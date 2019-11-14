import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the FooterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html',
})
export class FooterPage {
  isLoggedin:boolean;
  user_id:any;
  deviceId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public call:CallNumber,
    public alertCtrl:AlertController,
    ) {
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
  }
  gotoPage(routePage)
  {
    this.navCtrl.push(routePage);
    // if(this.isLoggedin ==true) {
    //   this.navCtrl.push(routePage);
    // }
    // else {
    //   this.navCtrl.push('LoginPage');
    // }
    
  }

  gotoHomePage() {
    this.navCtrl.push('HomePage');
  }
  
  dicountProPage() {
    this.navCtrl.push('ProductlistPage', { searchType: 'discount' });
  }

  // searchPage() {
  //   this.navCtrl.push('ProductlistPage',  { searchType: 'search' });
  // }

  searchPage() {
    this.navCtrl.push('SearchPage');
  }

  async callUs(phone): Promise<any> {

    let alert = this.alertCtrl.create({
      title: '',
      message: 'Are you sure to call?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.call.callNumber(phone, true)
          }
        }
      ]
    });
    alert.present();   

 }


}
