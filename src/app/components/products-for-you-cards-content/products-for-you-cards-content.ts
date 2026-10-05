import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { PRODUCT_CATALOGUE } from '../productdetails/productdetails';

export interface ProductCardItem {
  id: string | number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: string;
  secondsLeft?: number;
  countdownText?: string;
  hasCountdown?: boolean;
  mallBadge?: boolean;
  deliveryText?: string;
  originalDeliveryText?: string;
  extraImagesCount?: string;
  trustedBadge?: boolean;
  trustedText?: string;
}

@Component({
  selector: 'app-products-for-you-cards-content',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './products-for-you-cards-content.html',
  styleUrl: './products-for-you-cards-content.scss',
})
export class ProductsForYouCardsContent implements OnInit, OnDestroy {
  readonly productService = inject(ProductService);
  private timerInterval: any;

  // Initialize with fallback products for instant rendering
  productList: ProductCardItem[] = PRODUCT_CATALOGUE.map((p, index) => ({
    id: p.id,
    title: p.title,
    image: p.images[0],
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    rating: p.rating,
    reviews: p.ratingsCount,
    secondsLeft: p.secondsLeft || 28400,
    hasCountdown: index < 2,
    mallBadge: index < 2,
    deliveryText: index === 0 ? 'Delivery ₹60' : undefined,
    originalDeliveryText: index === 0 ? '₹70' : undefined,
    extraImagesCount: index === 2 ? '+4 More' : index === 3 ? '+1 More' : undefined,
    trustedBadge: index === 3,
    trustedText: index === 3 ? 'Trusted' : undefined
  }));

  constructor() {
    // Automatically re-render cards when product catalog updates from ProductService
    effect(() => {
      const products = this.productService.products();
      if (products && products.length > 0) {
        this.transformProducts(products);
      }
    });
  }

  ngOnInit(): void {
    this.startCountdownTimer();
    this.loadCatalogProducts();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  loadCatalogProducts(): void {
    this.productService.getProducts({ limit: 48 }).subscribe();
  }

  private transformProducts(products: any[]): void {
    this.productList = products.map((p, index) => {
      const mrp = p.mrp || p.originalPrice || Math.round(p.price * 1.3);
      const discount =
        p.discountPercent ||
        p.discount ||
        Math.max(0, Math.round(((mrp - p.price) / mrp) * 100));
      const ratingCount = p.ratingCount
        ? p.ratingCount.toLocaleString()
        : (1200 + index * 45).toLocaleString();

      let cardConfig: Partial<ProductCardItem> = {};
      if (index % 4 === 0) {
        cardConfig = {
          hasCountdown: true,
          mallBadge: true,
          deliveryText: p.freeDelivery ? 'Free Delivery' : 'Delivery ₹60',
          originalDeliveryText: '₹70',
          secondsLeft: 28400 - (index * 200)
        };
      } else if (index % 4 === 1) {
        cardConfig = {
          hasCountdown: true,
          mallBadge: true,
          secondsLeft: 19500 - (index * 150)
        };
      } else if (index % 4 === 2) {
        cardConfig = {
          extraImagesCount: '+4 More',
          deliveryText: p.freeDelivery ? 'Free Delivery' : undefined
        };
      } else {
        cardConfig = {
          extraImagesCount: '+2 More',
          trustedBadge: true,
          trustedText: 'Trusted',
          deliveryText: p.freeDelivery ? 'Free Delivery' : undefined
        };
      }

      return {
        id: p.id,
        title: p.title,
        image: p.image || p.imageUrl || '/assets/images/products-for-you/t-shirt.avif',
        price: p.price,
        originalPrice: mrp,
        discount,
        rating: p.rating || 4.1,
        reviews: ratingCount,
        ...cardConfig
      };
    });

    this.updateCountdowns();
  }

  startCountdownTimer(): void {
    this.updateCountdowns();
    this.timerInterval = setInterval(() => {
      this.updateCountdowns();
    }, 1000);
  }

  updateCountdowns(): void {
    this.productList.forEach((product) => {
      if (product.hasCountdown && product.secondsLeft !== undefined && product.secondsLeft > 0) {
        product.secondsLeft--;
        product.countdownText = this.formatTime(product.secondsLeft);
      } else if (product.hasCountdown) {
        product.countdownText = 'Expired';
      }
    });
  }

  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
  }
}