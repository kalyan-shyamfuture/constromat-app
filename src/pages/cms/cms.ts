import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';

/**
 * Generated class for the CmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ segment: 'cms/:id' })
@Component({
  selector: 'page-cms',
  templateUrl: 'cms.html',
})
export class CmsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController,
    public events: Events,
    private spinnerDialog: SpinnerDialog,
    public sp:ServicesProvider
  ) {
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
   this.events.publish(
    "headerData",{
      "mainHeader":true,
      "subHeader":false
    }
  );
    this.cmsDetails(this.navParams.get('id'));
  }

  cmsDetails(page_id) {

    this.sp.getCmsDetails(page_id).subscribe(
      res => {
      this.cmsDetails = res['result'][0];
      },
      error => {
      }
    )
  }

  
}
