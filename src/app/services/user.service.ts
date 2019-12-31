import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { SocialLoginService, Provider } from 'ng8-social-login';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})

export class UserService implements OnInit, OnDestroy {

    user: User = new User();
    isLogIn = false;
    private socialLoginSubs: Subscription;

    constructor(private socialLoginService: SocialLoginService, private router: Router) {}

    ngOnInit() {
    }

    loginWithGoogle(): void {
        this.socialLoginSubs = this.socialLoginService.login(Provider.GOOGLE)
            .subscribe(userData => {
                console.log(userData);
                this.isLogIn = true;
                this.user = new User();
                this.user.idToken = userData.idToken;
                this.user.name = userData.name;
                this.user.email = userData.email;
                this.user.phone = '';
                this.user.addressLine1 = '';
                this.user.addressLine2 = '';
        });
    }

    loginWithFacebook(): void {
        this.socialLoginSubs = this.socialLoginService.login(Provider.FACEBOOK)
            .subscribe(userData => {
                console.log(userData);
                this.user.idToken = userData.idToken;
                this.user.name = userData.name;
                this.user.email = userData.email;
            });
    }

    logout(): void {
        this.socialLoginSubs = this.socialLoginService.logout().subscribe({
            complete: () => console.log('Logout success'),
            error: err => console.log(err)
        });
    }

    updateUser(phone, addressLine1, addressLine2) {
        this.user.phone = phone;
        this.user.addressLine1 = addressLine1;
        this.user.addressLine2 = addressLine2;
    }

    isLoggedIn(): boolean {
        return this.isLogIn;
    }

    getUser() {
        return this.user;
    }

    ngOnDestroy() {
        this.socialLoginSubs.unsubscribe();
    }
}

