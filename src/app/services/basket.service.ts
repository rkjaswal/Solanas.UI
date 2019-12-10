import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { Subject, Subscription } from 'rxjs';
import { MenuService } from './menu.service';

@Injectable({providedIn: 'root'})

export class BasketService implements OnInit, OnDestroy {
    basketChanged = new Subject<MenuItem>();
    menuItems: MenuItem[] = [];
    menuItemsBasket: MenuItem[] = [];
    private menuItemSubs: Subscription;

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.menuItemSubs = this.menuService.menuChanged.subscribe( mItems => {
            this.menuItems = mItems;
        });
    }

    addMenuItemToBasket(menuItemId) {
        this.basketChanged.next(this.menuItems.find(i => i.menuItemId === menuItemId));
    }

    getMenuItemsBasket() {
        return this.menuItemsBasket;
    }

    ngOnDestroy() {
        this.menuItemSubs.unsubscribe();
    }
}

