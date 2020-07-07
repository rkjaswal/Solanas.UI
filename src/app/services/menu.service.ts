import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { Subject, Subscribable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', 'POST')
    .append('Access-Control-Allow-Origin', '*');

@Injectable({providedIn: 'root'})

export class MenuService implements OnInit, OnDestroy {
    menuChanged = new Subject<MenuItem[]>();
    menuItems: MenuItem[] = [];
    private menuChangedSubs: Subscription;

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {
    }

    getMenuItemsFromApi(): MenuItem[] {
        this.menuChangedSubs = this.httpClient.get<MenuItem[]>('https://apisolanas.appspot.com/api/menu/menuitems')
        .subscribe(resData => {
            this.menuChanged.next(resData);
            for (let i = 0; i < resData.length; i++) {
                this.menuItems.push({
                    itemId: resData[i].itemId,
                    item_CategoryId: resData[i].item_CategoryId,
                    itemName: resData[i].itemName,
                    itemDescription: resData[i].itemDescription,
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
