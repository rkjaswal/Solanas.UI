import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuService } from './services/menu.service';
import { MenuItem } from './models/menu-item.model';
import { BasketService } from './services/basket.service';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[] = [];
  menuItemsBasket: MenuItem[] = [];

  isCollapsed = true;

  private basketChangeSingleSubs: Subscription;
  private basketChangeMultipleSubs: Subscription;

  constructor(private menuService: MenuService, private basketService: BasketService, private userService: UserService) { }

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItemsFromApi();

    this.basketChangeSingleSubs = this.basketService.basketChangedSingle
    .subscribe(mItem => {
      this.menuItemsBasket.push(mItem);
    });

    this.basketChangeMultipleSubs = this.basketService.basketChangedMultiple
    .subscribe(mItems => {
        this.menuItemsBasket.splice(0, this.menuItemsBasket.length);

        for (let i = 0; i < mItems.length; i++) {
          this.menuItemsBasket.push(mItems[i]);
        }
    });
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  getEmail() {
    return this.userService.getEmail();
  }

  ngOnDestroy() {
      this.basketChangeSingleSubs.unsubscribe();
      this.basketChangeMultipleSubs.unsubscribe();
  }
}
