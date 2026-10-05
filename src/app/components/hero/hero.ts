import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeliveryLocation } from '../../layout/tablet-screen/delivery-location/delivery-location';

interface CategoryItem {
  name: string;
  imageUrl: string;
  route: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DeliveryLocation
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

  readonly categories: CategoryItem[] = [

    /*
    =========================
    CATEGORIES
    =========================
    */

    {
      name: 'Categories',
      imageUrl: '/assets/images/tablet-screen/top-sidebar/cate.webp',
      route: '/categories-data'
    },


    /*
    =========================
    OTHER CATEGORIES
    =========================
    */

    {
      name: 'Kurti & Dresses',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Kids & Toys',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Westernwear',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Home',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Men Clothing',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Saree',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Beauty',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Jewellery',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Kitchen',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Accessories',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Footwear',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Electronics',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Sports & Fitness',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    },

    {
      name: 'Furniture',
      imageUrl:
        '/assets/images/tablet-screen/top-sidebar/womens.webp',
      route: '/products'
    }

  ];
}