import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';
import { Subscription } from 'rxjs';

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

    private menuItemSubs: Subscription;

    constructor(private menuService: MenuService) {

    }

    ngOnInit() {
        this.menuItemSubs = this.menuService.menuChanged.subscribe( mItems => {
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
    }

    onAddToBasket(menuItemId) {
        console.log(menuItemId);
    }

    ngOnDestroy() {
        this.menuItemSubs.unsubscribe();
    }
}
