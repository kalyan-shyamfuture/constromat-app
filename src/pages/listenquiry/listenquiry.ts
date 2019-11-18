import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,MenuController } from 'ionic-angular';
import { ServicesProvider } from '../../core/services/services';
/**
 * Generated class for the ListenquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listenquiry',
  templateUrl: 'listenquiry.html',
})
export class ListenquiryPage {
  userId:string;
  qryList:any=[];
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
    console.log('ionViewDidLoad ListenquiryPage');
    this.getHeaderData();
    this.menuCtrl.close();
    this.listEnquiry();
  }

  listEnquiry() {
      var data = {
        "user_id":this.userId
      }
      console.log(data);
      this.sp.listQuery(data).subscribe(
        res => { 
          console.log(res);
          if(res['status']) {
            this.qryList = res['result']
          }
        },
        error => {
        }
      )
  }

  gotoDetails(data) {
    this.navCtrl.push('EnquirydetailsPage', { data: data});
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
