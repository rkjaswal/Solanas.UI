import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';
import { Subscription } from 'rxjs';
import { BasketService } from '../services/basket.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit, OnDestroy {
    menuItems: MenuItem[] = [];
    menuItemsSoup: MenuItem[] = [];
    menuItemsDimsum: MenuItem[] = [];
    menuItemsStarters: MenuItem[] = [];
    menuItemsGrills: MenuItem[] = [];
    menuItemsMainsCurries: MenuItem[] = [];
    menuItemsSides: MenuItem[] = [];
    menuItemsComboMeal: MenuItem[] = [];
    menuItemsBasket: MenuItem[] = [];

    private menuItemSubs: Subscription;
    private menuItemBasketSubs: Subscription;

    constructor(private menuService: MenuService, private basketService: BasketService) {

    }

    ngOnInit() {
        this.menuItemSubs = this.menuService.menuChanged
        .subscribe( mItems => {
            this.menuItems = mItems;
            this.menuItemsSoup = mItems.filter(i => i.menuItemTypeId === 1);
            this.menuItemsDimsum = mItems.filter(i => i.menuItemTypeId === 2);
            this.menuItemsStarters = mItems.filter(i => i.menuItemTypeId === 3);
            this.menuItemsGrills = mItems.filter(i => i.menuItemTypeId === 4);
            this.menuItemsMainsCurries = mItems.filter(i => i.menuItemTypeId === 5);
            this.menuItemsSides = mItems.filter(i => i.menuItemTypeId === 6);
            this.menuItemsComboMeal = mItems.filter(i => i.menuItemTypeId === 7);
        });
        this.menuService.getMenuItems();

        this.menuItemBasketSubs = this.menuItemBasketSubs = this.basketService.basketChanged
        .subscribe( mItems => {
            this.menuItemsBasket.push(mItems);
        });
    }

    onAddToBasket(menuItemId) {
        this.basketService.addMenuItemToBasket(menuItemId);
    }
  
    ngOnDestroy() {
        this.menuItemSubs.unsubscribe();
        this.menuItemBasketSubs.unsubscribe();
    }
}
