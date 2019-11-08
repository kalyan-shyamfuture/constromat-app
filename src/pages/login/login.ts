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
    public events1: Events,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private spinnerDialog: SpinnerDialog,
    public modalCtrl: ModalController,
    public sp:ServicesProvider,
  ) {
    //this.events1.publish('isHeaderHidden', false);
    this.events1.publish('isHeaderHidden', false);
    this.otpStatus=1;
    this.loginForm = this.formBuilder.group({
      email_phone: ['', Validators.required],
      password: ['', Validators.required],
    });
   // this.events1.publish('isHeaderHidden', true);
  //   this.loginForm = this.formBuilder.group({
  //     mobile: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
  //   });
  //   if (JSON.parse(localStorage.getItem("cart")) != null) {
  //     this.customer_cart_data = this.isCart;
  //   }
  //   else {
  //     this.customer_cart_data = [];
  //   }
  //   var str = "1234";
  //   var res = str.split("");
  //  var a = res[0];
  //  var b = res[1];
  //  var c = res[2];
  //  var d = res[3];

  }

  ionViewDidLoad() {
  //  this.events1.publish('hideBackButton', false);
    this.menuCtrl.close();
   // this.isOtpShow =0;
   // this.menuCtrl.enable(false);
  }

  // ionViewWillEnter() {
  //   this.menuCtrl.enable(true);
  //  this.events1.publish('hideBackButton', true);
  //   this.events1.publish('isHeaderHidden', true);
  //   this.menuCtrl.enable(false);
  // }
  // ionViewWillLeave() {
  //   this.menuCtrl.enable(true);
  // }


//   signIn() {
//     if (this.loginForm.valid) {
//      this.loginForm.value.device_token = localStorage.getItem('deviceId');
//      this.mobileNo = this.loginForm.value;
//      this.sp.userLogin(this.loginForm.value).subscribe(
//       res => { 
//         this.isOtpShow =1;
//         this.getOtp = res['result']['otp'];
//         this.getOtp = this.getOtp.toString();
//         var str = "1234";
//         var resOtp = this.getOtp.split("");
//        this.opt1 = resOtp[0];
//        this.opt2 = resOtp[1];
//        this.opt3 = resOtp[2];
//        this.opt4 = resOtp[3];

//        this.showResendOtp();
//       },
//       error => {
//         this.presentToast("Please check your internet connection!!!");
//       }
//     )
//     this.isOtpShow =1;
//     var str = "1234";
//     }
//     else {
//     }
//   }

//   resendOtp() {
//     this.spinnerDialog.show();
//     this.sp.userLogin(this.mobileNo).subscribe(
//       res => {  
//         this.isOtpShow =1;
//         this.getOtp = res['result']['otp'];
//         this.getOtp = this.getOtp.toString();
//         var str = "1234";
//         var resOtp = this.getOtp.split("");
//        this.opt1 = resOtp[0];
//        this.opt2 = resOtp[1];
//        this.opt3 = resOtp[2];
//        this.opt4 = resOtp[3];
//        this.spinnerDialog.hide();
//        this.presentToast("OTP send succesfully");
//       },
//       error => {
//         this.presentToast("Something going wrong");
//         this.spinnerDialog.hide();
//       }
//     )
//   }

//   getTypeOtp(type1,type2,type3,type4) {
//     this.typeOtp = type1+""+type2+""+type3+""+type4;
//    if(this.typeOtp ==this.getOtp ) {

//     var data = {

//     }
//     this.sp.userLoginFinal(this.mobileNo).subscribe(
//       res => {
//         this.userDetails = res['result']['user'];
//         localStorage.setItem('logged_user_name', this.userDetails['name']);
//         localStorage.setItem('logged_user_email', this.userDetails['email']);
//         localStorage.setItem('logged_user_contact_no', this.userDetails['contact']);
//         localStorage.setItem('logged_user_id', this.userDetails['id']);
//         localStorage.setItem('isLoggedin', 'true')
//         this.sp.loginStatus(true);
//         this.navCtrl.setRoot('HomePage');
//         if(this.userDetails['is_email_verified'] ==1) {
//           this.navCtrl.setRoot('HomePage');
//         }
//         else {
//           this.navCtrl.setRoot('ProfilePage');
//         }
        
     
//       },
//       error => {
//         this.presentToast("Please check your login credential");
//       }
//     )
//    }
//    else {
//      this.otpStatus = 0;
//    }
//   }

//   clearMsg() {
//     this.otpStatus = 1;
//   }

//   otpClose() {

//     this.otp1 = '';
//     this.otp2 = '';
//     this.otp3 = '';
//     this.otp4 = '';
//     this.isOtpShow =0;

//   }

//   setCartData() {
//     localStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
//   }

//   gotoPage(page) {
//     this.navCtrl.push(page);
//   }

//   gotoNextField(nextElement,otp) {
//     if(otp) {
//       nextElement.setFocus();
//     }
  
// }


// gotoPrevField(current,prev,next,otpPrev,otpCurrent,e) {
//   if(otpCurrent){
//     next.setFocus();
//   }
//   else {
//     prev.setFocus();
//   }
// }



// showResendOtp() {
//   this.showOtpResend= false;

//   let hideFooterTimeout = setTimeout( () => {
//     this.showOtpResend= true;
//   }, 10000);

// }


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

  

  
}
