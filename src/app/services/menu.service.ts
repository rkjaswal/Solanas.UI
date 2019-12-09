import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class MenuService {
    menuChanged = new Subject<MenuItem[]>();
    menuItems: MenuItem[] = [];

    constructor(private httpClient: HttpClient) {}

    getMenuItems() {
        this.httpClient.get<MenuItem[]>('https://solanasapi.appspot.com/api/menu/menuitems')
        .subscribe(resData => {
            this.menuChanged.next(resData);
        });
    }
}
