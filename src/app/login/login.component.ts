import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isLogin = true;

  loginForm!: FormGroup;

  fieldErrors = {
    email: false,
    password: false,
    confirmPassword: false
  };

  passwordPopoverOpen = false;
  passwordChecks = {
    length: false,
    englishAndNumbers: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.buildForm();
    this.setupFieldListeners();
  }

 
  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required),
    });

    if (!this.isLogin) {
      this.addRegisterValidators();
    }
  }

  addRegisterValidators() {
    this.loginForm.get('password')?.setValidators([
      Validators.required,
      this.passwordValidator.bind(this)
    ]);

    this.loginForm.addControl(
      'confirmPassword',
      new FormControl('', Validators.required)
    );

    this.loginForm.setValidators(this.matchPasswords.bind(this));
    this.loginForm.updateValueAndValidity();
  }

  removeRegisterValidators() {
    this.loginForm.get('password')?.setValidators([Validators.required]);
    this.loginForm.get('password')?.updateValueAndValidity();

    if (this.loginForm.contains('confirmPassword')) {
      this.loginForm.removeControl('confirmPassword');
    }

    this.loginForm.clearValidators();
    this.loginForm.updateValueAndValidity();
  }


  setupFieldListeners() {

    this.loginForm.get('email')?.valueChanges.subscribe(() => {
      if (this.fieldErrors.email) {
        this.fieldErrors.email = false;
      }
    });

    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      if (this.fieldErrors.password) {
        this.fieldErrors.password = false;
      }
    });


    this.loginForm.valueChanges.subscribe(() => {
      if (!this.loginForm.contains('confirmPassword')) return;

      if (this.fieldErrors.confirmPassword) {
        this.fieldErrors.confirmPassword = false;
      }
    });
  }

  toggleMode() {
    this.isLogin = !this.isLogin;

    // ניקוי שגיאות
    this.fieldErrors = {
      email: false,
      password: false,
      confirmPassword: false
    };

    if (this.isLogin) {
      this.removeRegisterValidators();
    } else {
      this.addRegisterValidators();
    }
  }

  passwordValidator(control: FormControl): ValidationErrors | null {
    const value = control.value || '';

    const lengthValid = value.length >= 8 && value.length <= 20;
    const englishAndNumbers =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);

    if (lengthValid && englishAndNumbers) {
      return null;
    }

    return {
      passwordInvalid: true,
      lengthValid,
      englishAndNumbers
    };
  }

  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (!confirm) return null;

    return pass === confirm ? null : { passwordsNotMatch: true };
  }

  onPasswordFocus() {
    if (!this.isLogin) this.passwordPopoverOpen = true;
  }

  onPasswordBlur() {
    this.passwordPopoverOpen = false;
  }

  onPasswordInput() {
    if (this.isLogin) return;

    const value = this.loginForm.get('password')?.value ?? '';

    this.passwordChecks.length = value.length >= 8 && value.length <= 20;
    this.passwordChecks.englishAndNumbers =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
  }


  login() {

    this.fieldErrors.email = this.loginForm.get('email')?.invalid ?? false;
    this.fieldErrors.password = this.loginForm.get('password')?.invalid ?? false;

    if (!this.isLogin && this.loginForm.get('confirmPassword')) {
      this.fieldErrors.confirmPassword =
        this.loginForm.get('confirmPassword')?.invalid ??
        this.loginForm.hasError('passwordsNotMatch');
    }

    if (this.fieldErrors.email ||
        this.fieldErrors.password ||
        this.fieldErrors.confirmPassword) {
      return;
    }

    alert("נשלח לשרת ✔");
  }

  goHomepage() {
    this.router.navigate(['']);
  }
}
