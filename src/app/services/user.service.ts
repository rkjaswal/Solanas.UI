import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { SocialLoginService, Provider } from 'ng8-social-login';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})

export class UserService implements OnInit, OnDestroy {

    user: User = new User();
    loginStatusChanged = new Subject<boolean>();
    loggedIn = false;
    private socialLoginSubs: Subscription;

    constructor(private socialLoginService: SocialLoginService, private router: Router) {}

    ngOnInit() {
    }

    loginWithGoogle(): void {
        this.socialLoginSubs = this.socialLoginService.login(Provider.GOOGLE)
            .subscribe(userData => {
                console.log(userData);
                this.user = new User();
                this.user.idToken = userData.idToken;
                this.user.name = userData.name;
                this.user.email = userData.email;
                this.user.phone = '';
                this.user.addressLine1 = '';
                this.user.addressLine2 = '';
                this.user.addressLine3 = '';

                if (userData) {
                    this.loginStatusChanged.next(true);
                    this.loggedIn = true;
                }
            });
    }

    loginWithFacebook(): void {
        this.socialLoginSubs = this.socialLoginService.login(Provider.FACEBOOK)
            .subscribe(userData => {
                console.log(userData);
                this.user.idToken = userData.idToken;
                this.user.name = userData.name;
                this.user.email = userData.email;
                this.user.phone = '';
                this.user.addressLine1 = '';
                this.user.addressLine2 = '';

                if (userData) {
                    this.loginStatusChanged.next(true);
                    this.loggedIn = true;
                }
            });
    }

    logout(): void {
        this.socialLoginSubs = this.socialLoginService.logout().subscribe({
            complete: () => console.log('Logout success'),
            error: err => console.log(err)
        });
    }

    updateUser(phone, addressLine1, addressLine2, addressLine3) {
        this.user.phone = phone;
        this.user.addressLine1 = addressLine1;
        this.user.addressLine2 = addressLine2;
        this.user.addressLine3 = addressLine3;
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    getUser() {
        return this.user;
    }

    getEmail() {
        return this.user.email;
    }

    ngOnDestroy() {
        this.socialLoginSubs.unsubscribe();
    }
}

