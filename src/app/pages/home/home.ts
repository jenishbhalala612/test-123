import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { CatCardsComponent } from '../../components/cat-cards/cat-cards';
import { Gold } from '../../components/gold/gold';
import { OriginalBrands } from '../../components/original-brands/original-brands';
import { LogoCards } from '../../components/logo-cards/logo-cards';
import { UptoOff } from '../../components/upto-off/upto-off';
import { ProductsForYou } from '../../components/products-for-you/products-for-you';
// import { CategoriesDataComponent } from '../../components/tablet-screen/categories-data/categories-data';
// import { AccountSidebarModule } from '../../components/tablet-screen/account-pages/account-homepage/account-sidebar-module';
// import { BankUpiDetailsComponent } from '../../components/tablet-screen/account-pages/bank-upi-details/bank-upi-details';
// import { BottomSideBarComponent } from '../../layout/tablet-screen/bottom-side-bar/bottom-side-bar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, CatCardsComponent, Gold, OriginalBrands, LogoCards, UptoOff, ProductsForYou],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
 
}
