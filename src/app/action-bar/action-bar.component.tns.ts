import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, isAndroid } from '@nativescript/core/ui/page/page';
import { SideDrawerService } from '../services/side-drawer.service';
import { BasketService } from '../services/basket.service';
import { MenuItem } from '../models/menu-item.model';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';

declare var android: any;

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})

export class ActionBarComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() showBackButton = true;
  @Input() showMenu = true;
  menuItems: MenuItem[] = [];
  menuItemsBasket: MenuItem[] = [];
  private basketChangeSingleSubs: Subscription;
  private basketChangeMultipleSubs: Subscription;

  constructor(
    private router: RouterExtensions,
    private sideDrawerService: SideDrawerService,
    private menuService: MenuService,
    private basketService: BasketService) { }

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItemsFromApi();

    this.basketChangeSingleSubs = this.basketService.basketChangedSingle
    .subscribe(mItem => {
      this.menuItemsBasket.push(mItem);
    });

    this.basketChangeMultipleSubs = this.basketService.basketChangedMultiple
    .subscribe(mItems => {
        this.menuItemsBasket.splice(0, this.menuItemsBasket.length);

        for (let i = 0; i < mItems.length; i++) {
          this.menuItemsBasket.push(mItems[i]);
        }
    });
  }

  get isAndroidPhone() {
    return isAndroid;
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  onFullMenu() {
    this.router.navigate(['/menu']);
  }

  onBasket() {
    this.router.navigate(['/basket']);
  }

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  onGoBack() {
    this.router.backToPreviousPage();
  }

  onToggleMenu() {
    this.sideDrawerService.toggleDrawer();
  }

  ngOnDestroy() {
    this.basketChangeSingleSubs.unsubscribe();
    this.basketChangeMultipleSubs.unsubscribe();
  }
}
