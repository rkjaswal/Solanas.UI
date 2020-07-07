import { Injectable, OnInit, OnDestroy, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Map } from '../models/map.model';

@Injectable({providedIn: 'root'})

export class UserService implements OnInit, OnDestroy {

    user: User = new User();
    loginStatusChanged = new Subject<boolean>();
    loggedIn = false;
    addressStatusChanged = new Subject<boolean>();
    addressInDeliveryRadius = true;
    private socialLoginSubs: Subscription;
    private addressStatusSubs: Subscription;

    constructor(private authService: AuthService, private router: Router, private zone: NgZone, private httpClient: HttpClient) {}

    ngOnInit() {
    }

    loginWithGoogle(): void {
        this.socialLoginSubs = this.authService.authState
            .subscribe(userData => {
                this.zone.run(() => {
                    console.log(userData);

                    if (userData) {
                        this.user.idToken = userData.idToken;
                        this.user.name = userData.name;
                        this.user.email = userData.email;
                        this.user.phone = '';
                        this.user.addressLine1 = '';
                        this.user.addressLine2 = '';
                        this.user.addressLine3 = '';

                        this.loginStatusChanged.next(true);
                        this.loggedIn = true;
                    }
                });
            });

        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    loginWithFacebook(): void {
        this.socialLoginSubs = this.authService.authState
            .subscribe(userData => {
                this.zone.run(() => {
                    console.log(userData);

                    if (userData) {
                        this.user.idToken = userData.idToken;
                        this.user.name = userData.name;
                        this.user.email = userData.email;
                        this.user.phone = '';
                        this.user.addressLine1 = '';
                        this.user.addressLine2 = '';
                        this.user.addressLine3 = '';

                        this.loginStatusChanged.next(true);
                        this.loggedIn = true;
                    }
                });
            });

        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    logout(): void {
        this.authService.signOut();
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

    isAdmin(): boolean {
        if (this.loggedIn) {
            if (this.user.email === 'rkjaswal@gmail.com') {
                return true;
            }
        }
    }

    getUser() {
        return this.user;
    }

    saveUser() {
    }

    getEmail() {
        return this.user.email;
    }

    ngOnDestroy() {
        this.socialLoginSubs.unsubscribe();
        this.addressStatusSubs.unsubscribe();
    }

    isInDeliveryRadius(destination): void {
        this.addressStatusSubs = this.httpClient.get<Map>('https://apisolanas.appspot.com/api/map/distance?destination=' + destination)
        .subscribe(resData => {
            console.log(resData.distance);
            if (resData.distance > 7000) {
                console.log(resData.distance > 7000);
                this.addressStatusChanged.next(false);
            } else {
                this.addressStatusChanged.next(true);
            }
        }, error => {
             alert('Sorry, we could not validate the address entered by you, please check the address and try again.');
        });
    }
}

