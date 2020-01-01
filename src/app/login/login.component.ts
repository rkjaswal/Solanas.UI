import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginStatusChangedSubs: Subscription;

  constructor(private userService: UserService, private basketService: BasketService, private router: Router) { }

  ngOnInit() {
    if (this.basketService.menuItemsBasket.length === 0) {
      this.router.navigate(['/basket']);
    }
  }

  loginWithGoogle(): void {

    this.loginStatusChangedSubs = this.userService.loginStatusChanged
      .subscribe(loggedIn => {
        this.router.navigate(['/basket']);
      });

    this.userService.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this.loginStatusChangedSubs = this.userService.loginStatusChanged
      .subscribe(loggedIn => {
        this.router.navigate(['/userinfo']);
      });

    this.userService.loginWithFacebook();
  }

  logout(): void {
    this.userService.loginWithGoogle();
  }

  ngOnDestroy() {
    if (this.userService.isLoggedIn()) {
      this.loginStatusChangedSubs.unsubscribe();
    }
  }
}
