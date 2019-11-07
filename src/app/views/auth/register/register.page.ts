import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { InputValidator, PasswordValidator } from '../../../core/validators';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm = this.fb.group({
    email: ['susanta@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    confirmPassword: ['', Validators.required]
  }, { validator: PasswordValidator('password', 'confirmPassword') });
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
  onSubmitRegister() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.storage.set('userData', this.registerForm.value);
      this.registerForm.reset();
      this.router.navigate(['/dashboard']);
    }
  }
}
