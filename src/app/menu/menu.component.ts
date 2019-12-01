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
    private menuItemSubs: Subscription;

    constructor(private menuService: MenuService) {

    }

    ngOnInit() {
        this.menuItemSubs = this.menuService.menuItemsChanged.subscribe( mItems => {
            this.menuItems = mItems.slice();
        });
        this.menuService.getMenuItems();
    }

    ngOnDestroy() {
        this.menuItemSubs.unsubscribe();
    }
}
