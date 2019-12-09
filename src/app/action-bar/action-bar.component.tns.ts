import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, isAndroid } from '@nativescript/core/ui/page/page';
import { SideDrawerService } from '../services/side-drawer.service';
import { BasketService } from '../services/basket.service';
import { MenuItem } from '../models/menu-item.model';
import { Subscription } from 'rxjs';

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
  menuItemsBasket: MenuItem[] = [];
  private menuItemBasketSubs: Subscription;

  constructor(
    private page: Page,
    private router: RouterExtensions,
    private sideDrawerService: SideDrawerService,
    private basketService: BasketService) { }

  ngOnInit() {
      this.menuItemBasketSubs = this.menuItemBasketSubs = this.basketService.basketChanged
      .subscribe( mItems => {
          this.menuItemsBasket.push(mItems);
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
    this.menuItemBasketSubs.unsubscribe();
  }
}
