import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SideDrawerService } from './services/side-drawer.service';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;
  private drawerSub: Subscription;
  private drawer: RadSideDrawer;

  constructor(
    private sideDrawerService: SideDrawerService,
    private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.drawerSub = this.sideDrawerService.drawerState.subscribe(() => {
      if (this.drawer) {
        this.drawerComponent.sideDrawer.toggleDrawerState();
      }
    });
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }

  onSelect() {
    this.sideDrawerService.toggleDrawer();
  }
  
  ngOnDestroy() {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe();
    }
  }
}
