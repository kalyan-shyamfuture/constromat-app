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
  loginMobileForm: FormGroup;
  otpForm: FormGroup;
  newOtp:any;
  loginType:any="email";
  getDetails:any;
  showOtp:boolean=false;

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
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginMobileForm = this.formBuilder.group({
      mobile: ['', Validators.required],
    });

    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required],
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

  onSegmentChange(val) {
    this.loginType = val;
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
            localStorage.setItem('logged_user_image',  res['result']['detail']['profile_image']);
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

  signInMobile() {
    if (this.loginMobileForm.valid) {
     this.sp.userLoginMobile(this.loginMobileForm.value).subscribe(
      res => { 
        console.log(res);
        if(res['status']) {
          this.showOtp =true;
          this.getOtp = res['result']['otp'];
          this.getDetails = res['result']['detail'];
          console.log(this.getOtp);
          this.presentToast("OTP - "+this.getOtp);
        }
      },
      error => {
        this.presentToast("Error!!!!");
      }
    )
    }
  }

  signInOtp() {
    this.newOtp = this.otpForm.value.otp;
    if(this.newOtp == this.getOtp) {
      console.log("OTP matched!!");

      localStorage.setItem('logged_user_name',  this.getDetails['name']);
            localStorage.setItem('logged_user_email',  this.getDetails['email']);
            localStorage.setItem('logged_user_contact_no',  this.getDetails['phone']);
            localStorage.setItem('logged_user_id',  this.getDetails['id']);
            localStorage.setItem('logged_user_image',  this.getDetails['profile_image']);
            
            localStorage.setItem('isLoggedin', 'true')
            this.sp.loginStatus(true);
               this.navCtrl.setRoot('HomePage');
    }
    else {
      console.log("OTP Mismatched");
      this.presentToast("OTP Mismatched!!!");
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

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
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
