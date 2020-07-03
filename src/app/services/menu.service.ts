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
            // alert('Sorry, it seems we encountered an error, you will not be able to place online orders, please try after some time.');
        });

        return this.menuItems;
    }

    getMenuItemsFromPetPoojaApi(): MenuItem[] {
        this.menuChangedSubs = this.httpClient.post('https://api.petpooja.com/V1/pendingorders/mapped_restaurant_menus/', 
        {
            "app_key":"yfjzntocg5krpq3xh67v10ws4uebmd28",
            "app_secret":"28b1b6360b43785a995290762de494047e4adf63",
            "access_token":"7a2159959d376d12acb46db2090b8d2e7981c19e",
            "restID":"e1zb0ksm",
            "data_type":"json"
        }, {headers})
        .subscribe(
            (resData) => {
                console.log("POST call successful value returned in body", 
                resData);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
        return this.menuItems;
    }

    // getMenuItemsFromFirestore(): MenuItem[] {
    //     var mItems = this.firestore.collection('menuitems').snapshotChanges();
    //     console.log(mItems);
    //     return this.menuItems;
    // }

    getMenuItems() {
        return this.menuItems;
    }

    ngOnDestroy() {
        this.menuChangedSubs.unsubscribe();
    }
}
