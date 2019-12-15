import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {

  menuItemsBasket: MenuItem[];
  totalPrice: number;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.menuItemsBasket = this.basketService.getMenuItemsBasket();
  }

  removeMenuItemsFromBasket(menuItemId) {
    this.basketService.removeMenuItemToBasket(menuItemId);
  }

  getTotalPrice() {
    return this.basketService.getTotalPrice();
  }
}
