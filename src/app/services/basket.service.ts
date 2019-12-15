import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { Subject, Subscription } from 'rxjs';
import { MenuService } from './menu.service';

@Injectable({providedIn: 'root'})

export class BasketService implements OnInit, OnDestroy {
    basketChangedSingle = new Subject<MenuItem>();
    basketChangedMultiple = new Subject<MenuItem[]>();
    menuItems: MenuItem[] = [];
    menuItemsBasket: MenuItem[] = [];
    private menuItemSubs: Subscription;
    private totalPrice: number;

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.menuItemSubs = this.menuService.menuChanged.subscribe(mItems => {
            this.menuItems = mItems;
        });
        this.menuItems = this.menuService.getMenuItems();
    }

    getMenuItemsBasket() {
        return this.menuItemsBasket;
    }

    addMenuItemToBasket(menuItemId) {
        this.menuItems = this.menuService.getMenuItems();
        const mItem = this.menuItems.find(i => i.menuItemId === menuItemId);
        this.basketChangedSingle.next(mItem);
        this.menuItemsBasket.push({
            menuItemId: mItem.menuItemId,
            menuItemTypeId: mItem.menuItemTypeId,
            name: mItem.name,
            description: mItem.description,
            price: mItem.price,
            imageName: mItem.imageName,
            isFeatured: mItem.isFeatured,
        });
    }

    removeMenuItemToBasket(menuItemId) {
        const mItemIndex = this.menuItemsBasket.map(function(i) { return i.menuItemId; }).indexOf(menuItemId);
        this.menuItemsBasket.splice(mItemIndex, 1);

        this.basketChangedMultiple.next(this.menuItemsBasket);
    }

    getTotalPrice() {
        this.totalPrice = 0;

        for (let i = 0; i < this.menuItemsBasket.length; i++) {
            this.totalPrice = this.totalPrice + this.menuItemsBasket[i].price;
          }

        return this.totalPrice;
    }

    ngOnDestroy() {
        this.menuItemSubs.unsubscribe();
    }
}

