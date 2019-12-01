import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { MenuComponent } from '@src/app/menu/menu.component';
import { BasketComponent } from './basket/basket.component';

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
];
