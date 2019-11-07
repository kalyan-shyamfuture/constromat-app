import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { InputValidator } from '../../../core/validators';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm = this.fb.group({
    email: ['susanta@test.com', [Validators.required, Validators.email]],
    password: ['Susanta', Validators.required]
  });
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  errorState(formName, field, validatorFieldName) {
    return InputValidator(formName, field, validatorFieldName);
  }
  onSubmitLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.storage.set('userData', this.loginForm.value);
      console.log(this.loginForm);
      this.loginForm.reset();
      this.router.navigate(['/dashboard']);
    }
  }
}
