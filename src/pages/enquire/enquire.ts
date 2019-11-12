import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Events, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';

/**
 * Generated class for the EnquirePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enquire',
  templateUrl: 'enquire.html',
})
export class EnquirePage {
  enquireForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private spinnerDialog: SpinnerDialog,
    public modalCtrl: ModalController,
    public sp:ServicesProvider,
  ) {
    this.getHeaderData();


    this.enquireForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      organization: ['', Validators.required],
      productname: ['', Validators.required],
      qty: ['', Validators.required],
      unit: ['', Validators.required],
      deliverylocation:['', Validators.required],
      remarks:['', Validators.required],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquirePage');
    this.menuCtrl.close();
    this.getHeaderData();
  }

  ionViewDidEnter() {
    this.getHeaderData();
  }



  signIn() {
    if (this.enquireForm.valid) {
      this.enquireForm.value.user_type ="2";
     this.sp.userLogin(this.enquireForm.value).subscribe(
      res => { 
        if(res['result'].status) {
          console.log(res['result']['detail']);
            localStorage.setItem('logged_user_name', res['result']['detail']['name']);
            localStorage.setItem('logged_user_email', res['result']['detail']['email']);
            localStorage.setItem('logged_user_contact_no', res['result']['detail']['phone']);
            localStorage.setItem('logged_user_id', res['result']['detail']['id']);
            localStorage.setItem('isLoggedin', 'true')
            this.sp.loginStatus(true);
               this.navCtrl.setRoot('HomePage');
        }
      },
      error => {
        this.presentToast("Please check your internet connection!!!");
      }
    )
    }
  }

  
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValid(field: string) {
    return !this.enquireForm.get(field).valid && (this.enquireForm.get(field).dirty || this.enquireForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.enquireForm.get(field).invalid && (this.enquireForm.get(field).dirty || this.enquireForm.get(field).touched),
      'is-valid': this.enquireForm.get(field).valid && (this.enquireForm.get(field).dirty || this.enquireForm.get(field).touched)
    };
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
