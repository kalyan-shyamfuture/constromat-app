import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Events } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ServicesProvider } from '../../core/services/services';

/**
 * Generated class for the NewenquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newenquiry',
  templateUrl: 'newenquiry.html',
})
export class NewenquiryPage {
  isShow:boolean=false;
  newenquiryForm: FormGroup;
  enquiry_details: FormArray;
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
    allProduct:any=[];
    productDetails:any;
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
    this.newenquiryForm = this.formBuilder.group({
      //user_org_type: ['', Validators.required],
      user_org_type: ['', ""],
      user_delivery_location: ['', ""],
      site_name: ['', ""],
      site_supervisor_name: ['',""],
      enquiry_details: this.formBuilder.array([ this.createItem() ])
    });
    this.productslist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewenquiryPage');
    this.menuCtrl.close();
    this.getHeaderData();
    this.productslist();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
   
      product_id: [""],
      product_type_id: [""],
      product_unit_id: [""],
      unit_rate: [""],
      quantity: [""],
      total_rate: [""]
    });
  }

  newqueryFormAdd() {
    console.log("New Query Form ==>",this.newenquiryForm.value);
  }

  addItem(): void {
    this.enquiry_details = this.newenquiryForm.get('enquiry_details') as FormArray;
    this.enquiry_details.push(this.createItem());
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
          console.log(this.allProduct);
         
        }
      },
      error => {
      }
    )
  }

  getProductDetails(id) {
    this.isShow =true;
    var data = {
      "product_id":id
    } 
    this.sp.getProductList(data).subscribe(
      res => {
        console.log(res);
        if (res['status']) {
          this.productDetails = res['result']['data'];
        }
      },
      error => {
      }
    )
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

  getHeaderData() {
    this.events.publish(
      "headerData",{
        "isHeaderHidden": false,
        "isSubHeaderHidden":true,
        "hideBackButton": true,
        "title":" Welcome to Constromat"
      }
    );
  }

}
