import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { BasketService } from '../services/basket.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {

  menuItemsBasket: MenuItem[];

  constructor(private basketService: BasketService, private userService: UserService) { }

  ngOnInit() {
    this.menuItemsBasket = this.basketService.getMenuItemsBasket();
  }

  removeMenuItemsFromBasket(menuItemId) {
    this.basketService.removeMenuItemToBasket(menuItemId);
  }

  getTotalPrice() {
    return this.basketService.getTotalPrice();
  }

  getDiscountedPrice() {
    return this.basketService.getDiscountedPrice();
  }

  getDiscount() {
    return this.basketService.getDiscount();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  getUserName() {
    return this.userService.getUser().name;
  }
}
