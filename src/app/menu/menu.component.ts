import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';
import { BasketService } from '../services/basket.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

    @ViewChild('tabset', {static: false}) tabset: TabsetComponent;

    mItems: MenuItem[] = [];
    menuItemsSoup: MenuItem[] = [];
    menuItemsDimsum: MenuItem[] = [];
    menuItemsStarters: MenuItem[] = [];
    menuItemsGrills: MenuItem[] = [];
    menuItemsMainsCurries: MenuItem[] = [];
    menuItemsSides: MenuItem[] = [];
    menuItemsComboMeal: MenuItem[] = [];

    constructor(private menuService: MenuService, private basketService: BasketService) { }

    ngOnInit() {

        this.mItems = this.menuService.getMenuItems();
        this.menuItemsSoup = this.mItems.filter(i => i.menuItemTypeId === 1);
        this.menuItemsDimsum = this.mItems.filter(i => i.menuItemTypeId === 2);
        this.menuItemsStarters = this.mItems.filter(i => i.menuItemTypeId === 3);
        this.menuItemsGrills = this.mItems.filter(i => i.menuItemTypeId === 4);
        this.menuItemsMainsCurries = this.mItems.filter(i => i.menuItemTypeId === 5);
        this.menuItemsSides = this.mItems.filter(i => i.menuItemTypeId === 6);
        this.menuItemsComboMeal = this.mItems.filter(i => i.menuItemTypeId === 7);
    }

    onAddToBasket(menuItemId) {
        this.basketService.addMenuItemToBasket(menuItemId);
    }

    showTab(id) {
        this.tabset.tabs[id].active = true;
    }
}
