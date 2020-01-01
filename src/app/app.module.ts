import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSocialLoginModule } from 'ng8-social-login';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { MenuComponent } from '@src/app/menu/menu.component';
import { ActionBarComponent } from '@src/app/action-bar/action-bar.component';
import { BasketComponent } from '@src/app/basket/basket.component';
import { OrderComponent } from '@src/app/order/order.component';
import { MenuItemComponent } from '@src/app/menu-item/menu-item.component';
import { LoginComponent } from '@src/app/login/login.component';
import { UserInfoComponent } from '@src/app/user-info/user-info.component';
import { OrderReviewComponent } from '@src/app/order-review/order-review.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ActionBarComponent,
    BasketComponent,
    OrderComponent,
    MenuItemComponent,
    LoginComponent,
    UserInfoComponent,
    OrderReviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxSocialLoginModule.init({
      google: {
        client_id: '40007158707-0dgtlflut8jtus4eis2u3jmtt39fkhks.apps.googleusercontent.com'
      },
      facebook: {
        initOptions: {
            appId: '505026036788455'
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
