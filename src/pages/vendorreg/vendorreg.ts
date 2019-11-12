import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';

/**
 * Generated class for the VendorregPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendorreg',
  templateUrl: 'vendorreg.html',
})
export class VendorregPage {
  vendorForm: FormGroup;
 
  turnover : any = [
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public menuCtrl: MenuController,
    public sp:ServicesProvider,
  ) {


    this.vendorForm = this.formBuilder.group({
      name: ['', Validators.required],
      companyname: ['', Validators.required],
      businessType: ['',Validators.required],
      listbox: ['', Validators.required],
      gstin: ['', Validators.required],
      financialTurnover: ['',Validators.required],
      mobile: ['', Validators.required],
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

  vendorSignUp()
  {

    if (this.vendorForm.valid) {
      console.log("Form Submit==>",this.vendorForm.value);
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
      "title":"Vendor Registration"
    }
  );
}
}
