import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  loginWithGoogle(): void {
    this.userService.loginWithGoogle();

    if (this.userService.isLoggedIn) {
      this.router.navigate(['/userinfo']);
    }
  }

  loginWithFacebook(): void {
    this.userService.loginWithFacebook();
  }

  logout(): void {
    this.userService.loginWithGoogle();
  }
}
