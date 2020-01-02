import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { Subject, Subscribable, Subscription } from 'rxjs';

@Injectable({providedIn: 'root'})

export class MenuService implements OnInit, OnDestroy {
    menuChanged = new Subject<MenuItem[]>();
    menuItems: MenuItem[] = [];
    private menuChangedSubs: Subscription;

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {
    }

    getMenuItemsFromApi(): MenuItem[] {
        this.menuChangedSubs = this.httpClient.get<MenuItem[]>('https://solanasapi.appspot.com/api/menu/menuitems')
        .subscribe(resData => {
            this.menuChanged.next(resData);
            for (let i = 0; i < resData.length; i++) {
                this.menuItems.push({
                    menuItemId: resData[i].menuItemId,
                    menuItemTypeId: resData[i].menuItemTypeId,
                    name: resData[i].name,
                    description: resData[i].description,
                    price: resData[i].price,
                    imageName: resData[i].imageName,
                    featured: resData[i].featured,
                });
            }
        }, error => {
            alert('Sorry, it seems we encountered an error, you will not be able to place online orders, please try after some time.');
        });

        return this.menuItems;
    }

    getMenuItems() {
        return this.menuItems;
    }

    ngOnDestroy() {
        this.menuChangedSubs.unsubscribe();
    }
}
