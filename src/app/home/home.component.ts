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
  private menuChangedSubs: Subscription;

  constructor(private menuService: MenuService, private basketService: BasketService) { }

  ngOnInit() {
    this.menuChangedSubs = this.menuService.menuChanged
      .subscribe(menu => {
        this.menuItemsFeatured = this.menuService.getMenuItems().filter(i => i.featured === true);
      });

      this.menuItemsFeatured = this.menuService.getMenuItems().filter(i => i.featured === true);
  }

  onAddToBasket(menuItemId) {
      this.basketService.addMenuItemToBasket(menuItemId);
  }

  ngOnDestroy() {
    this.menuChangedSubs.unsubscribe();
  }
}
