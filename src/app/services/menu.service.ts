import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MenuService {
    menuItemsChanged = new Subject<MenuItem[]>();
    menuItems: MenuItem[] = [];

    constructor(private httpClient: HttpClient) {}

    getMenuItems() {
        this.httpClient.get<MenuItem[]>('https://solanasapi.appspot.com/api/menu/menuitems')
        .subscribe(resData => {
            console.log(resData);
            this.menuItemsChanged.next(resData);
        });
    }
}
