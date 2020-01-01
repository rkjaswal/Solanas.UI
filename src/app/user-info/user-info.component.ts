import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfoForm: FormGroup;
  user: User = new User();
  formSubmitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.user = this.userService.getUser();

    this.userInfoForm = this.formBuilder.group({
      name: [{ value: this.user.name, disabled: true }],
      email: [{ value: this.user.email, disabled: true }],
      phone: [this.user.phone, [Validators.required, Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)]],
      addressLine1: [this.user.addressLine1, Validators.required],
      addressLine2: [this.user.addressLine2, Validators.required],
      addressLine3: [this.user.addressLine3, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userInfoForm.controls; }

  onFormSubmit() {
    this.formSubmitted = true;

    // stop here if form is invalid
    if (this.userInfoForm.invalid) {
      return;
    }

    this.user.phone = this.userInfoForm.controls.phone.value;
    this.user.addressLine1 = this.userInfoForm.controls.addressLine1.value;
    this.user.addressLine2 = this.userInfoForm.controls.addressLine2.value;
    this.user.addressLine3 = this.userInfoForm.controls.addressLine3.value;

    this.userService.updateUser(this.user.phone, this.user.addressLine1, this.user.addressLine2, this.user.addressLine3);

    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/orderreview']);
    }
  }
}
