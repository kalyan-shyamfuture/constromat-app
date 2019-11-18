import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
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
  public panDocument: any;
  public aadharDocument: any;
  public gstDocument: any;
  public tradeDocument: any;
  public addDocument: any;
  vendorForm: FormGroup;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  allProduct: any=[];

  financialTurnover: any = [
    { id: 1, price: "Less than 50L" },
    { id: 1, price: "50L less than 1 Cr" },
    { id: 1, price: "1Cr less than 5Cr" },
    { id: 1, price: "5Cr less than 25Cr" },
    { id: 1, price: "25Cr and more" },
  ]

  categoryList: any = [
    { id: 1, name: "Manufacturer" },
    { id: 2, name: "Distributor" },
    { id: 3, name: "C&F" },
    { id: 4, name: "Independent Seller" },
    { id: 5, name: "Dealer" },
    { id: 6, name: "Others" },
  ]


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
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public menuCtrl: MenuController,
    public sp: ServicesProvider,
  ) {



    this.vendorForm = this.formBuilder.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      business_type: ['', Validators.required],
      website: ['', Validators.required],
      list_box: ['', Validators.required],
      gstin: ['', Validators.required],
      pan_no: ['', Validators.required],
      turnover: ['', Validators.required],
      product: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      landmark: ['', Validators.required],
      pin_code: ['', Validators.required],
      pan_doc: ['', Validators.required],
      aadhar_doc: ['', Validators.required],
      trade_doc: ['', Validators.required],
      gst_doc: ['', Validators.required],
      add_doc: ['', Validators.required],

    });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.getCountryList();
    this.productslist();
    this.getHeaderData();
  }

  ionViewWillEnter() {
    this.getHeaderData();
  }


  getCountryList() {
    this.sp.getCountryList().subscribe(
      res => {
       // console.log(res);
        if (res['status']) {
          this.countryList = res['result']
        }
      },
      error => {
      }
    )
  }



  getStateValues(val) {
    console.log("Get Values==>", val);
    this.sp.getStateList(val).subscribe(
      res => {
        console.log(res);
        if (res['status']) {
          this.stateList = res['result']
        }
      },
      error => {
      }
    )
  }
  getCityValues(val) {
    console.log("Get State id==>", val);
    this.sp.getCityList(val).subscribe(
      res => {
        console.log(res);
        if (res['status']) {
          this.cityList = res['result']
        }
      },
      error => {
      }
    )
  }

  productslist()
  {
    var data = {
      "product_id":""
    } 
    this.sp.getProductList(data).subscribe(
      res => {
        //console.log(res);
        if (res['status']) {
          this.allProduct = res['result']['data'];
        }
      },
      error => {
      }
    )

  }

  vendorSignUp() {
    if (this.vendorForm.valid) {
      console.log(this.vendorForm.value);
      let formData = new FormData();
      formData.append('name' , this.vendorForm.value.name);
      formData.append('company_name' , this.vendorForm.value.company_name);
      formData.append('business_type' , this.vendorForm.value.business_type);
      formData.append('website' , this.vendorForm.value.website);
      formData.append('list_box' , this.vendorForm.value.list_box);
      formData.append('gstin' , this.vendorForm.value.gstin);
      formData.append('pan_no' , this.vendorForm.value.pan_no);
      formData.append('turnover' , this.vendorForm.value.turnover);
      formData.append('product' , this.vendorForm.value.product);
      formData.append('phone' , this.vendorForm.value.mobile);
      formData.append('email' , this.vendorForm.value.email);
      formData.append('country' , this.vendorForm.value.namcountrye);
      formData.append('state' , this.vendorForm.value.state);
      formData.append('city' , this.vendorForm.value.city);
      formData.append('address1' , this.vendorForm.value.address1);
      formData.append('address2' , this.vendorForm.value.address2);
      formData.append('landmark' , this.vendorForm.value.landmark);
      formData.append('pin_code' , this.vendorForm.value.pin_code);
      formData.append('pan_doc' , this.panDocument);
      formData.append('aadhar_doc' , this.aadharDocument);
      formData.append('trade_doc' , this.tradeDocument);
      formData.append('gst_doc' , this.gstDocument);
      formData.append('add_doc' , this.addDocument);

      formData.append('user_type' , '3');
      this.vendorForm.value.user_type = "3";
      this.sp.vendorContact(formData).subscribe(
      // this.sp.vendorContact(this.vendorForm.value).subscribe(
        res => {
          console.log(res);
          this.presentToast(res['result']['message']);
          this.vendorForm.reset();

        },
        error => {
          this.presentToast("Error!!!!");
        }
      )

    }
    else
      console.log(this.vendorForm);


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
      "headerData", {
      "isHeaderHidden": false,
      "isSubHeaderHidden": true,
      "hideBackButton": false,
      "title": "Vendor Registration"
    }
    );
  }

  panDoc(event) {
    if (event.target.files.length) {
      this.panDocument = event.target.files[0];
      console.log(event.target.files[0]);

    }
  }

  aadharDoc(event) {
    if (event.target.files.length) {
      this.aadharDocument = event.target.files[0];
      console.log(event.target.files[0]);
    }
  }
 
  tradeDoc(event) {
    if (event.target.files.length) {
      this.tradeDocument = event.target.files[0];
      console.log(event.target.files[0]);

    }
  }

  gstDoc(event) {
    if (event.target.files.length) {
      this.gstDocument = event.target.files[0];
      console.log(event.target.files[0]);

    }
  }

  addDoc(event) {
    if (event.target.files.length) {
      this.addDocument = event.target.files[0];
      console.log(event.target.files[0]);

    }
  }



}

