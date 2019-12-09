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

export class HomeComponent implements OnInit, OnDestroy {
  title = 'Solanas Wok & Grill';
  menuItemsFeatured: MenuItem[] = [];

  private menuItemSubs: Subscription;

  constructor(private menuService: MenuService, private basketService: BasketService) { }

  ngOnInit() {
    this.menuItemSubs = this.menuService.menuChanged.subscribe( mItems => {
        this.menuItemsFeatured = mItems.filter(i => i.isFeatured === true);
    });
    this.menuService.getMenuItems();
  }

  onAddToBasket(menuItemId) {
      this.basketService.addMenuItemToBasket(menuItemId);
  }

  ngOnDestroy() {
      this.menuItemSubs.unsubscribe();
  }
}
