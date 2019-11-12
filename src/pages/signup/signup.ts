import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
//Services


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  isShowHeader:number;
  signupForm: FormGroup;


  businessType :any =[
    {id:1, type:"Construction Company"},
    {id:2, type:"Imfrastructure"},
    {id:3, type:"Goverment"},
    {id:4, type:"Organization"},
    {id:5, type:"Builders"},
    {id:6, type:"RMC"},
    {id:7, type:"Manufacturer of construction product"},
    {id:8, type:"Contractors"},
    {id:9, type:"Others"}
    ]

     
  financialTurnover : any = [
    {id:1, price:"Less than 50L"},
    {id:1, price:"50L less than 1 Cr"},
    {id:1, price:"1Cr less than 5Cr"},
    {id:1, price:"5Cr less than 25Cr"},
    {id:1, price:"25Cr and more"},
  ] 

  country : any = [
    {id:1, name:"India"},
    {id:1, name:"Usa"},
  ]

  state : any = [
    {id:1, name:"Westbengal"},
    {id:1, name:"Delhi"},
  ]

  city : any = [
    {id:1, name:"Durgapur"},
    {id:1, name:"Kolkata"},
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public menuCtrl: MenuController,
  ) {
    this.events.publish(
      "headerData",{
        "mainHeader":true,
        "subHeader":false
      }
    );

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      website: ['', Validators.required],
      business_type: ['',Validators.required],
       turnover: ['',Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      country: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
    
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.getHeaderData();
  }

  ionViewWillEnter() {
    this.getHeaderData();
  }

  signUp() {
    if (this.signupForm.valid) {
      console.log("Signup Form ==>",this.signupForm.value);
    //   this.signupForm.value.user_type ="2";
    //  this.sp.userLogin(this.signupForm.value).subscribe(
    //   res => { 
    //     if(res['result'].status) {
    //       console.log(res['result']['detail']);
    //         localStorage.setItem('logged_user_name', res['result']['detail']['name']);
    //         localStorage.setItem('logged_user_email', res['result']['detail']['email']);
    //         localStorage.setItem('logged_user_contact_no', res['result']['detail']['phone']);
    //         localStorage.setItem('logged_user_id', res['result']['detail']['id']);
    //         localStorage.setItem('isLoggedin', 'true')
    //         this.sp.loginStatus(true);
    //            this.navCtrl.setRoot('HomePage');
    //     }
    //   },
    //   error => {
    //     this.presentToast("Error!!!!");
    //   }
    // )
    }
  }

  gotoSignin() {
    this.navCtrl.push('LoginPage');
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
      position:'top'
    });
    toast.present();
  }

  getHeaderData() {
    this.events.publish(
      "headerData",{
        "isHeaderHidden": false,
        "isSubHeaderHidden":true,
        "hideBackButton": false,
        "title":"User Registration"
      }
    );
  }

}
