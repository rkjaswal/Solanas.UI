import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { MenuComponent } from '@src/app/menu/menu.component';
import { ActionBarComponent } from '@src/app/action-bar/action-bar.component';
import { BasketComponent } from '@src/app/basket/basket.component';
import { OrderComponent } from '@src/app/order/order.component';
import { LoginComponent } from '@src/app/login/login.component';
import { UserInfoComponent } from '@src/app/user-info/user-info.component';
import { OrderReviewComponent } from '@src/app/order-review/order-review.component';
import { ComboMealComponent } from '@src/app/menu/combo-meal/combo-meal.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('40007158707-0dgtlflut8jtus4eis2u3jmtt39fkhks.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("507746310091526")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ActionBarComponent,
    BasketComponent,
    OrderComponent,
    LoginComponent,
    UserInfoComponent,
    OrderReviewComponent,
    ComboMealComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFireDatabaseModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
