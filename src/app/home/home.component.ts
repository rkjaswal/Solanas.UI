import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';
import { Subscription } from 'rxjs';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  title = 'Solanas Wok & Grill';
  menuItemsFeatured: MenuItem[] = [];

  private menuItemSubs: Subscription;

  constructor(private menuService: MenuService, private basketService: BasketService) { }

  ngOnInit() {
    this.menuItemsFeatured = this.menuService.getMenuItems().filter(i => i.isFeatured === true);
  }

  onAddToBasket(menuItemId) {
      this.basketService.addMenuItemToBasket(menuItemId);
  }
}
