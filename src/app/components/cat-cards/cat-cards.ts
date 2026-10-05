import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CategoryCard {
  name: string;
  imageUrl: string;
  route: string;
}

@Component({
  selector: 'app-cat-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cat-cards.html',
  styleUrl: './cat-cards.scss'
})
class CatCardsComponent {
  // Easily mutable dataset for category cards with sample online images and links
  readonly categoryCards: CategoryCard[] = [
    { name: 'Ethnic Wear',       imageUrl: '/assets/images/cards/ethnic.webp',    route: '/products' },
    { name: 'Western Dresses',   imageUrl: '/assets/images/cards/western.webp',   route: '/products' },
    { name: 'Menswear',          imageUrl: '/assets/images/cards/menswear.webp',  route: '/products' },
    { name: 'Footwear',          imageUrl: '/assets/images/cards/footwaer.webp',  route: '/products' },
    { name: 'Home Decor',        imageUrl: '/assets/images/cards/home-decor.webp',route: '/products' },
    { name: 'Beauty',            imageUrl: '/assets/images/cards/beauty.webp',    route: '/products' },
    { name: 'Accessories',       imageUrl: '/assets/images/cards/accessories.webp',route: '/products' },
    { name: 'Grocery',           imageUrl: '/assets/images/cards/grocery.webp',   route: '/products' }
  ];
}

export { CatCardsComponent };