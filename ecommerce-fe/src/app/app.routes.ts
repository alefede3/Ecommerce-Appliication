import { Routes } from '@angular/router';
import {Cart} from './features/components/cart/cart';
import {ProductsList} from './features/components/products-list/products-list';
import {Checkout} from './features/components/checkout/checkout';
import {PaymentConfirmed} from './features/components/payment-confirmed/payment-confirmed';
import {PurchasedHistory} from './features/components/purchased-history/purchased-history';

export const routes: Routes = [
  { path: '', component: ProductsList },
  { path: 'home', component: ProductsList },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'paymentConfirmed', component: PaymentConfirmed},
  { path: 'purchasedHistory', component: PurchasedHistory }
];
