import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,MenuController} from 'ionic-angular';
import { ServicesProvider } from '../../core/services/services';
/**
 * Generated class for the EnquirydetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ segment: 'enquirydetails/:id' })
@Component({
  selector: 'page-enquirydetails',
  templateUrl: 'enquirydetails.html',
})
export class EnquirydetailsPage {
  qryDetails:any=[];
  userId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
     public sp: ServicesProvider,
    ) {
      if (localStorage.getItem('isLoggedin')) {
        this.userId = localStorage.getItem('logged_user_id');
      }
      else {
        this.userId = '';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquirydetailsPage');
    this.getHeaderData();
    this.menuCtrl.close();
    this.qryDetails = this.navParams.get('data');
    console.log("jjj",this.qryDetails);
  }

  getHeaderData() {
    this.events.publish(
      "headerData",{
        "isHeaderHidden": false,
        "isSubHeaderHidden":true,
        "hideBackButton": false,
        "title":" Welcome to Constromat"
      }
    );
  }


}
