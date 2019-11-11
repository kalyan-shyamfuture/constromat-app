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
  contact;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events1: Events,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    public menuCtrl: MenuController,
  ) {
    this.events1.publish('isHeaderHidden', false);

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      companyname: ['', Validators.required],
      website: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
    
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
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

  isFieldValid(field: string) {
    return !this.signupForm.get(field).valid && (this.signupForm.get(field).dirty || this.signupForm.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.signupForm.get(field).invalid && (this.signupForm.get(field).dirty || this.signupForm.get(field).touched),
      'is-valid': this.signupForm.get(field).valid && (this.signupForm.get(field).dirty || this.signupForm.get(field).touched)
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
