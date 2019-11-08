import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events,ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

import { ServicesProvider } from '../../core/services/services';

/**
 * Generated class for the ProfileeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-profileedit',
  templateUrl: 'profileedit.html',
})
export class ProfileeditPage {
  profileForm: FormGroup;
  userId: any;
  addressData: any;
  isUpdate: any;
  editAddress: any;
  gender: any;
  isLoggedin: boolean;
  deviceId: any;
  isExist: any;
  isError: any = 0;
  userDetails:any ={};
  isReadOnly:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events1: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public menuCtrl: MenuController,
    public sp: ServicesProvider
    ) {
      if (localStorage.getItem('isLoggedin')) {
        this.userId = localStorage.getItem('logged_user_id');
        this.isLoggedin = true;
        this.deviceId = "";
      }
      else {
        this.userId = '';
        this.isLoggedin = false;
        this.deviceId = localStorage.getItem('deviceId');
      }

      this.profileForm = this.formBuilder.group({
        gender: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', Validators.required],
        city: ['', Validators.required],
        dob: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.events1.publish('hideBackButton', false);
    this.events1.publish('isHeaderHidden', true);
    this.getUserDetails(this.userId);
  }
  getUserDetails(id) {
    this.sp.getUserDetails(id).subscribe(
      res => {  
        this.userDetails = res['result'];
        if(this.userDetails.is_email_verified ==1) {
          this.isReadOnly = true;
        }
        else {
          this.isReadOnly = false;
        }
        if(!this.userDetails.gender) {
          this.userDetails.gender ="";
        }
        this.profileForm.patchValue({
          gender: this.userDetails.gender,
          name: this.userDetails.name,
          email: this.userDetails.email,
          city: this.userDetails.city,
          dob: this.userDetails.dob
        })
      },
      error => {
      }
    )
  }

  updateProfile() {
    if (this.profileForm.valid) {
       this.profileForm.value.contact = this.userDetails.contact;
        this.sp.updateProfile(this.profileForm.value,this.userId).subscribe(
          res => {
             if(res['status']==false) {
              this.presentToast("Email already used!!!");
            }
            else {
              this.navCtrl.push('ProfilePage');
            }

          },
          error => {
          }
        )
      
    

    }
    else {
      this.markFormGroupTouched(this.profileForm)
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
    return !this.profileForm.get(field).valid && (this.profileForm.get(field).dirty || this.profileForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.profileForm.get(field).invalid && (this.profileForm.get(field).dirty || this.profileForm.get(field).touched),
      'is-valid': this.profileForm.get(field).valid && (this.profileForm.get(field).dirty || this.profileForm.get(field).touched)
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

}
