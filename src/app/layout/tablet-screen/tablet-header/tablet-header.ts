import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriesDataComponent } from '../../../components/tablet-screen/categories-data/categories-data';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-tablet-header',
  standalone: true,
  imports: [RouterLink, CategoriesDataComponent],
  templateUrl: './tablet-header.html',
  styleUrl: './tablet-header.scss'
})
export class TabletHeaderComponent {
 showCategories = false;

  openCategories(): void {
    this.showCategories = true;
  }

  closeCategories(): void {
    this.showCategories = false;
  }
  
  menuOpen = false;
  readonly headerData = {
    logo: {
      image: '/assets/images/meesho-logo.png',
      alt: 'Meesho Logo'
    },

    menu: {
      image: '/assets/images/arrows/bars.svg',
      alt: 'Menu'
    },

    search: {
      placeholder: 'Search for Sarees, Kurtis, Cosmetics',
      icon: '/assets/images/arrows/search.png',
      iconAlt: 'Search',
      cameraIcon: '/assets/images/arrows/camera.png',
      cameraAlt: 'Search by Image',

      // Search component route
      redirectRoute: '/search'
    },

    actions: {
      wishlist: {
        image: '/assets/images/arrows/wishlist-red.svg',
        alt: 'Wishlist',
        route: '/wishlist'
      },

      cart: {
        image: '/assets/images/arrows/cart-header.svg',
        alt: 'Cart',
        route: '/cart'
      }
    }
  };


  constructor(
    private router: Router,
    readonly cart: CartService
  ) { }


  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }


  goToSearch(): void {
    this.router.navigate([
      this.headerData.search.redirectRoute
    ]);
  }


  goToWishlist(): void {
    this.router.navigate([
      this.headerData.actions.wishlist.route
    ]);
  }


  goToCart(): void {
    this.router.navigate([
      this.headerData.actions.cart.route
    ]);
  }

}