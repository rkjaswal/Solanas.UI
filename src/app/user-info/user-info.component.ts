import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  userInfoForm: FormGroup;
  user: User = new User();
  formSubmitted = false;
  private addressStatusChangedSubs: Subscription;
  inDeliveryRadius = true;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  @HostListener('window:scroll', [])

  ngOnInit() {

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.user = this.userService.getUser();

    this.userInfoForm = this.formBuilder.group({
      name: [this.user.name],
      email: [this.user.email],
      phone: [this.user.phone, [Validators.required, Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)]],
      addressLine1: [this.user.addressLine1, Validators.required],
      addressLine2: [this.user.addressLine2, Validators.required],
      addressLine3: ['Gurugram'],
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

    this.userService.updateUser(this.user.phone, this.user.addressLine1, this.user.addressLine2, this.user.addressLine3);

    this.addressStatusChangedSubs = this.userService.addressStatusChanged
      .subscribe(result => {
        console.log('addressstatuschange subscribe');
        console.log(result);
        if (result) {
          this.inDeliveryRadius = true;
          this.router.navigate(['/orderreview']);
        } else {
          this.inDeliveryRadius = false;
          return;
        }
      });

    this.userService.isInDeliveryRadius(this.user.addressLine2);
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy() {
    if(this.addressStatusChangedSubs){
      this.addressStatusChangedSubs.unsubscribe();
     }
  }
 }
