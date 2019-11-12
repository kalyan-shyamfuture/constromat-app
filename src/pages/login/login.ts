import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Events, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  showOtpResend:boolean;
  loginForm: FormGroup;
  lastPage: any;
  isCart: any;
  customer_cart_data: any = [];
  isOtpShow:number;
  getOtp:any;
  opt1:any ="";
  opt2:any ="";
  opt3:any ="";
  opt4:any ="";

  typeOtp:any;
  mobileNo:any;
  userDetails:any;
  otpStatus:any;

  otp1:any ="";
  otp2:any ="";
  otp3:any ="";
  otp4:any ="";

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
    this.otpStatus=1;
    this.loginForm = this.formBuilder.group({
      email_phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
   // this.menuCtrl.enable(false);
   this.getHeaderData();
  }

  ionViewWillEnter() {
    this.getHeaderData();
  }

  signIn() {
    if (this.loginForm.valid) {
      this.loginForm.value.user_type ="2";
     this.sp.userLogin(this.loginForm.value).subscribe(
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
        this.presentToast("Error!!!!");
      }
    )
    }
  }

  gotoPage(page) {
    this.navCtrl.push(page);
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
    return !this.loginForm.get(field).valid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.loginForm.get(field).invalid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched),
      'is-valid': this.loginForm.get(field).valid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched)
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
