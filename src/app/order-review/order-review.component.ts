import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { BasketService } from '../services/basket.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  menuItemsBasket: MenuItem[];
  user: User;

  constructor(private basketService: BasketService, private userService: UserService) { }

  ngOnInit() {
    this.menuItemsBasket = this.basketService.getMenuItemsBasket();
    this.user = this.userService.getUser();
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
}
