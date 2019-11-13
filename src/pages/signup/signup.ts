import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';
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
  countryList:any=[];
  stateList:any=[];
  cityList:any=[];
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public menuCtrl: MenuController,
    public sp:ServicesProvider
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
      pin_code: ['', Validators.required],
    
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.getHeaderData();
    this.getCountryList();
  }

  ionViewWillEnter() {
    this.getHeaderData();
  }

  getCountryList() {
     this.sp.getCountryList().subscribe(
      res => { 
        console.log(res);
        if(res['status']) {
          this.countryList = res['result']
        }
      },
      error => {
      }
    )
  }

  getStateValues(val) {
    console.log("Get Values==>",val);
    this.sp.getStateList(val).subscribe(
      res => { 
        console.log(res);
        if(res['status']) {
          this.stateList = res['result']
        }
      },
      error => {
      }
    )
  }
  getCityValues(val) {
    console.log("Get State id==>",val);
    this.sp.getCityList(val).subscribe(
      res => { 
        console.log(res);
        if(res['status']) {
          this.cityList = res['result']
        }
      },
      error => {
      }
    )
  }

  signUp() {
    if (this.signupForm.valid) {
      console.log("Signup Form ==>",this.signupForm.value);
      this.signupForm.value.user_type ="2";
     this.sp.userRegistration(this.signupForm.value).subscribe(
      res => { 
        console.log(res);
        if(res['result'].status) {
          this.presentToast(res['result']['message']);
          console.log(res['result']['detail']);
           this.navCtrl.setRoot('LoginPage');
        }
        else {
          this.presentToast(res['message']);
        }
      },
      error => {
        this.presentToast("Error!!!!");
      }
    )
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
