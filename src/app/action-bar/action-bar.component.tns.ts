import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, isAndroid } from '@nativescript/core/ui/page/page';
import { SideDrawerService } from '../services/side-drawer.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})

export class ActionBarComponent implements OnInit {
  @Input() title: string;
  @Input() showBackButton = true;
  @Input() showMenu = true;
  
  constructor(private page: Page, private router: RouterExtensions, private sideDrawerService: SideDrawerService) { }

  ngOnInit() {
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
}
