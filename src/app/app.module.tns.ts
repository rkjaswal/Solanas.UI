import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { ActionBarComponent } from '@src/app/action-bar/action-bar.component';
import { HomeComponent } from '@src/app/home/home.component';
import { MenuComponent } from '@src/app/menu/menu.component';
import { BasketComponent } from '@src/app/basket/basket.component';
import { OrderComponent } from '@src/app/order/order.component';
import { LoginComponent } from '@src/app/login/login.component';
import { UserInfoComponent } from '@src/app/user-info/user-info.component';
import { OrderReviewComponent } from '@src/app/order-review/order-review.component';
import { ComboMealComponent } from '@src/app/menu/combo-meal/combo-meal.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    ActionBarComponent,
    HomeComponent,
    MenuComponent,
    BasketComponent,
    OrderComponent,
    LoginComponent,
    UserInfoComponent,
    OrderReviewComponent,
    ComboMealComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
