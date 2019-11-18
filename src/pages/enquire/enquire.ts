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
  allProduct:any=[];
  business_type: any = [
    { id: 1, type: "Construction Company" },
    { id: 2, type: "Imfrastructure" },
    { id: 3, type: "Goverment" },
    { id: 4, type: "Organization" },
    { id: 5, type: "Builders" },
    { id: 6, type: "RMC" },
    { id: 7, type: "Manufacturer of construction product" },
    { id: 8, type: "Contractors" },
    { id: 9, type: "Others" }
  ]
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
    this.productslist();

    this.enquireForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_phone: ['', Validators.required],
      user_email: ['', Validators.required],
      user_org_type: ['', Validators.required],
      user_delivery_location: ['', Validators.required],
      user_quote: ['', Validators.required],
      user_product: ['', Validators.required],
      user_project_qty:['', Validators.required],
      user_project_unit:['', Validators.required],
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

  productslist()
  {
    var data = {
      "product_id":""
    } 
    this.sp.getProductList(data).subscribe(
      res => {
        console.log(res);
        if (res['status']) {
          this.allProduct = res['result']['data'];
        }
      },
      error => {
      }
    )

  }



  addEnquiry() {
    if (this.enquireForm.valid) {
      console.log(this.enquireForm.value);
     //this.enquireForm.value.enquiry_type ="home";
     let formData = new FormData();
      formData.append('enquiry_type' ,'home');
      formData.append('user_name' , this.enquireForm.value.user_name);
      formData.append('user_phone' , this.enquireForm.value.user_phone);
      formData.append('user_email' , this.enquireForm.value.user_email);
      formData.append('user_org_type' , this.enquireForm.value.user_org_type);
      formData.append('user_delivery_location' , this.enquireForm.value.user_delivery_location);
      formData.append('user_quote' , this.enquireForm.value.user_quote);
      formData.append('user_product' , this.enquireForm.value.user_product);
      formData.append('user_project_qty' , this.enquireForm.value.user_project_qty);
      formData.append('user_project_unit' , this.enquireForm.value.user_project_unit);
     this.sp.addEnquiry(formData).subscribe(
      res => { 
        console.log("Add Enquiry Success==>",res);
        if(res['result'].status) {
          this.enquireForm.reset();
          this.presentToast(res['result'].message);
        }
        else {
          this.presentToast(res['result'].message);
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
