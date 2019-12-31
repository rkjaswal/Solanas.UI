import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { MenuComponent } from '@src/app/menu/menu.component';
import { BasketComponent } from './basket/basket.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { OrderReviewComponent } from './order-review/order-review.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
      path: 'menu',
      component: MenuComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userinfo',
    component: UserInfoComponent,
  },
  {
    path: 'orderreview',
    component: OrderReviewComponent,
  },
];
