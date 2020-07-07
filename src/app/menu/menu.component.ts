import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';
import { BasketService } from '../services/basket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

    @ViewChild('tabset', {static: false}) tabset: TabsetComponent;

    mItems: MenuItem[] = [];
    menuItemsVegSoup: MenuItem[] = [];
    menuItemsNonVegSoup: MenuItem[] = [];
    menuItemsVegDimsum: MenuItem[] = [];
    menuItemsNonVegDimsum: MenuItem[] = [];
    menuItemsVegStarters: MenuItem[] = [];
    menuItemsNonVegStarters: MenuItem[] = [];
    menuItemsGrills: MenuItem[] = [];
    menuItemsVegMainsCurries: MenuItem[] = [];
    menuItemsNonVegMainsCurries: MenuItem[] = [];
    menuItemsVegSides: MenuItem[] = [];
    menuItemsNonVegSides: MenuItem[] = [];
    menuItemsComboMeal: MenuItem[] = [];

    constructor(private menuService: MenuService, private basketService: BasketService, private router: Router) { }

    ngOnInit() {

        this.mItems = this.menuService.getMenuItems();
        this.menuItemsVegSoup = this.mItems.filter(i => i.item_CategoryId === 281084);
        this.menuItemsNonVegSoup = this.mItems.filter(i => i.item_CategoryId === 281085);
        this.menuItemsVegDimsum = this.mItems.filter(i => i.item_CategoryId === 281086);
        this.menuItemsNonVegDimsum = this.mItems.filter(i => i.item_CategoryId === 281087);
        this.menuItemsVegStarters = this.mItems.filter(i => i.item_CategoryId === 281088);
        this.menuItemsNonVegStarters = this.mItems.filter(i => i.item_CategoryId === 281089);
        this.menuItemsGrills = this.mItems.filter(i => i.item_CategoryId === 281090 || i.item_CategoryId === 281091);
        this.menuItemsVegMainsCurries = this.mItems.filter(i => i.item_CategoryId === 281093);
        this.menuItemsNonVegMainsCurries = this.mItems.filter(i => i.item_CategoryId === 281094);
        this.menuItemsVegSides = this.mItems.filter(i => i.item_CategoryId === 281096);
        this.menuItemsNonVegSides = this.mItems.filter(i => i.item_CategoryId === 281097);
        this.menuItemsComboMeal = this.mItems.filter(i => i.item_CategoryId === 7);
    }

    onAddToBasket(menuItemId) {
        console.log(menuItemId);
        if (menuItemId === 85) {
            this.router.navigate(['/menu/combomeal']);
        } else {
            this.basketService.addMenuItemToBasket(menuItemId);
        }
    }

    showTab(id) {
        this.tabset.tabs[id].active = true;
    }
}
