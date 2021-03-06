import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService , private alertify: AlertifyService , private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
   this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['' , Validators.required],
      knownAs: ['' , Validators.required],
      dateOfBirth: [null , Validators.required],
      city: ['' , Validators.required],
      country: ['' , Validators.required],
      password: ['' , [Validators.minLength(4) , Validators.maxLength(12) , Validators.required]],
      confirmPassword: ['' , Validators.required]
    } , {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'missmatch' : true};
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Register succed');
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);

  }

}
