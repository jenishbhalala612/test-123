import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Signpage } from './components/signpage/signpage';
import { Userverifyotp } from './components/userverifyotp/userverifyotp'; // <-- 
import { ProductDetails } from './components/productdetails/productdetails';
import { ProductsForYou } from './components/products-for-you/products-for-you';
import { CartPage } from './components/cart-pages/cart-page/cart-page';
import { CartAddress } from './components/cart-pages/cart-address/cart-address';
import { CartPayment } from './components/cart-pages/cart-payment/cart-payment';
import { BillReviews } from './components/buy-now-bills-components/bill-reviews/bill-reviews';
import { BillPayment } from './components/buy-now-bills-components/bill-payment/bill-payment';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'signup', component: Signpage },
  { path: 'verify-otp', component: Userverifyotp }, // <-- 
  { path: 'products', component: ProductsForYou },
  { path: 'product/:id', component: ProductDetails },
  { path: 'cart', component: CartPage },
  { path: 'bill-reviews', component: BillReviews },
  { path: 'bill-payment', component: BillPayment },
  { path: 'app-cart-address', component: CartAddress },
  { path: 'app-cart-payment', component: CartPayment },

  { path: '**', redirectTo: '' }
];