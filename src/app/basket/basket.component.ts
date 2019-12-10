import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {

  menuItemsBasket: MenuItem[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.menuItemsBasket = this.basketService.getMenuItemsBasket();
  }

}
