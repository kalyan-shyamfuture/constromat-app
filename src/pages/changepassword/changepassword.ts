import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,MenuController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../core/services/services';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  changepassword: any;
  userId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sp:ServicesProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,
    ) { 
      this.changepassword = this.formBuilder.group({
      newpassword: ['', Validators.required],
      confpassword: ['', Validators.required],
    });
    this.userId = localStorage.getItem('logged_user_id');
  }

  changePassword() {
    if (this.changepassword.valid) {
      console.log(this.changepassword.value);
     this.sp.requestChangePassword(this.userId,this.changepassword.value).subscribe(
      res => { 
        this.presentToast("Password Changed Succesfully");
        this.changepassword.reset();
        
      },
      error => {
        this.presentToast("Error!!!!");
      }
    )
  }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
    this.menuCtrl.close();
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



}
