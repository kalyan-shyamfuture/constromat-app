import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, MenuController, Events, ModalController, ViewController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';
import { environment } from '../../core/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage({ segment: 'productlist/:id' })
@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  baseimg: any = environment.imageBaseUrl;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private spinnerDialog: SpinnerDialog,
    public events: Events,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public sp: ServicesProvider,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public keyboard: Keyboard
  ) {

  }

  ionViewDidLoad() {
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
