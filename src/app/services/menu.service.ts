import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class MenuService {
    menuChanged = new Subject<MenuItem[]>();
    menuItems: MenuItem[] = [];

    constructor(private httpClient: HttpClient) {}

    getMenuItemsFromApi(): MenuItem[] {
        this.httpClient.get<MenuItem[]>('https://solanasapi.appspot.com/api/menu/menuitems')
        .subscribe(resData => {
            this.menuChanged.next(resData);
            for (let i = 0; i < resData.length; i++)
            {
                this.menuItems.push({
                    menuItemId: resData[i].menuItemId,
                    menuItemTypeId: resData[i].menuItemTypeId,
                    name: resData[i].name,
                    description: resData[i].description,
                    price: resData[i].price,
                    imageName: resData[i].imageName,
                    isFeatured: resData[i].isFeatured,
                });
            }
        }, error => {
            alert('Sorry, our website is undergoing maintenance, you will not be able to place online orders, please try after some time.');
        });

        return this.menuItems;
    }

    getMenuItems() {
        return this.menuItems;
    }
}
