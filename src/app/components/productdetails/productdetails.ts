import { Component, OnInit, OnDestroy, NgZone, inject } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../core/services/cart.service';
import { BuyNowService } from '../../core/services/buy-now.service';
import { ProductService } from '../../core/services/product.service';
import { PincodeInfo } from '../../core/models/product.model';
import { Subscription } from 'rxjs';

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface Seller {
  name: string;
  rating: number;
  followers: string;
  productCount?: number;
}

export interface RatingBar {
  label: string;
  percentage: number;
  count: number;
}

export interface UserReview {
  name: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  helpfulCount: number;
}

export interface SimilarProductItem {
  id: string | number;
  image: string;
  name?: string;
}

export interface ProductDetailsData {
  id: string | number;
  breadcrumbs: Breadcrumb[];
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  dealActive: boolean;
  secondsLeft: number;
  rating: number;
  ratingsCount: string;
  reviewsCount: string;
  images: string[];
  similarProduct: { name: string; image: string };
  similarProducts?: SimilarProductItem[];
  sizes: string[];
  highlights: Record<string, any>;
  additionalDetails: Record<string, any>;
  seller: Seller;
  ratingBreakdown: RatingBar[];
  userReviews: UserReview[];
}

// Fallback / initial sample catalogue for offline or instant rendering
export const PRODUCT_CATALOGUE: ProductDetailsData[] = [
  {
    id: 'p2130',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Toys & Games', url: '/products' },
      { name: 'Fancy Kids Educational Toys', url: '#' }
    ],
    title: 'Fancy Kids Educational Toys',
    price: 108,
    originalPrice: 120,
    discount: 10,
    dealActive: true,
    secondsLeft: 35244,
    rating: 4.0,
    ratingsCount: '334',
    reviewsCount: '125',
    images: [
      '/assets/images/toys & games/Fancy_Kids_Educational_Toys.webp',
      '/assets/images/toys & games/Fancy_Kids_Educational_Toys.avif',
      '/assets/images/toys & games/Fashionable_Kids_Clay_slime.webp'
    ],
    similarProduct: {
      name: 'Fancy Kids Educational Toys',
      image: '/assets/images/toys & games/Fancy_Kids_Educational_Toys.avif'
    },
    sizes: ['Free Size'],
    highlights: {
      Type: 'Creative Play',
      Material: 'Non-toxic Clay',
      'Age Group': '5+ Years',
      Color: 'Multicolor'
    },
    additionalDetails: {
      Pieces: '12',
      'Skill Developed': 'Motor Skills',
      Safety: 'BIS Tested',
      'Net Quantity (N)': '1',
      'Generic Name': 'Toys',
      'Country of Origin': 'India'
    },
    seller: {
      name: 'Blue Orchid Retail',
      rating: 4.1,
      followers: '80,047',
      productCount: 1161
    },
    ratingBreakdown: [
      { label: 'Excellent', percentage: 45, count: 150 },
      { label: 'Very Good', percentage: 25, count: 83 },
      { label: 'Good', percentage: 14, count: 46 },
      { label: 'Average', percentage: 4, count: 13 },
      { label: 'Poor', percentage: 12, count: 42 }
    ],
    userReviews: [
      {
        name: 'Nikhil Rao',
        rating: 4.0,
        date: '17 Aug 2026',
        comment: 'Decent buy. My kid played with it for hours and loved it. Would buy again.',
        images: ['/assets/images/toys & games/Unique_Kids_Jigsaw_Puzzle.webp'],
        helpfulCount: 3
      }
    ]
  },
  {
    id: 'p1330',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Footwear', url: '/products' },
      { name: 'Modern Trendy Women Flipflops', url: '#' }
    ],
    title: 'Modern Trendy Women Flipflops Slippers',
    price: 127,
    originalPrice: 200,
    discount: 36,
    dealActive: true,
    secondsLeft: 18400,
    rating: 4.5,
    ratingsCount: '4,040',
    reviewsCount: '890',
    images: [
      '/assets/images/footware/Modern_Trendy_Women_Flipflops_Slippers (1).avif',
      '/assets/images/footware/Modern_Trendy_Women_Flipflops_Slippers (2).avif'
    ],
    similarProduct: {
      name: 'Modern Trendy Women Flipflops',
      image: '/assets/images/footware/Modern_Trendy_Women_Flipflops_Slippers (1).avif'
    },
    sizes: ['4', '5', '6', '7', '8'],
    highlights: {
      Material: 'EVA',
      Sole: 'Rubber',
      Fastening: 'Slip-On',
      Pattern: 'Solid'
    },
    additionalDetails: {
      Occasion: 'Casual',
      'Net Quantity (N)': '1 Pair',
      'Country of Origin': 'India'
    },
    seller: {
      name: 'Footwear Hub',
      rating: 4.3,
      followers: '12,500',
      productCount: 420
    },
    ratingBreakdown: [
      { label: 'Excellent', percentage: 65, count: 2626 },
      { label: 'Very Good', percentage: 20, count: 808 },
      { label: 'Good', percentage: 8, count: 323 },
      { label: 'Average', percentage: 4, count: 161 },
      { label: 'Poor', percentage: 3, count: 122 }
    ],
    userReviews: [
      {
        name: 'Ritu Verma',
        rating: 5.0,
        date: '20 Aug 2026',
        comment: 'Very soft and comfortable for daily wear.',
        images: [],
        helpfulCount: 8
      }
    ]
  }
];

function normalizeProduct(raw: any): ProductDetailsData {
  const price = raw.price ?? 0;
  const originalPrice = raw.mrp || raw.originalPrice || Math.round(price * 1.3);
  const discount =
    raw.discountPercent ||
    raw.discount ||
    Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

  const totalRatings = raw.ratingSummary?.totalRatings ?? raw.ratingCount ?? 450;
  const totalReviews = raw.ratingSummary?.totalReviews ?? raw.reviewCount ?? 120;

  const breakdown = raw.ratingSummary?.breakdown;
  const ratingBreakdown: RatingBar[] = breakdown
    ? [
        {
          label: 'Excellent',
          percentage: totalRatings ? Math.round((breakdown.excellent / totalRatings) * 100) : 60,
          count: breakdown.excellent
        },
        {
          label: 'Very Good',
          percentage: totalRatings ? Math.round((breakdown.veryGood / totalRatings) * 100) : 22,
          count: breakdown.veryGood
        },
        {
          label: 'Good',
          percentage: totalRatings ? Math.round((breakdown.good / totalRatings) * 100) : 10,
          count: breakdown.good
        },
        {
          label: 'Average',
          percentage: totalRatings ? Math.round((breakdown.average / totalRatings) * 100) : 5,
          count: breakdown.average
        },
        {
          label: 'Poor',
          percentage: totalRatings ? Math.round((breakdown.poor / totalRatings) * 100) : 3,
          count: breakdown.poor
        }
      ]
    : [
        { label: 'Excellent', percentage: 70, count: Math.round(totalRatings * 0.7) },
        { label: 'Very Good', percentage: 18, count: Math.round(totalRatings * 0.18) },
        { label: 'Good', percentage: 7, count: Math.round(totalRatings * 0.07) },
        { label: 'Average', percentage: 3, count: Math.round(totalRatings * 0.03) },
        { label: 'Poor', percentage: 2, count: Math.round(totalRatings * 0.02) }
      ];

  const userReviews: UserReview[] = (raw.reviews || raw.userReviews || []).map((r: any) => ({
    name: r.userName || r.name || 'Verified Buyer',
    rating: r.rating || 5,
    date: r.postedOn || r.date || 'Recent',
    comment: r.text || r.comment || 'Great product, satisfied with quality!',
    images: r.images || [],
    helpfulCount: r.helpfulCount || 0
  }));

  const rawImages = Array.isArray(raw.images) && raw.images.length > 0 ? raw.images : [raw.image || '/assets/images/products-for-you/t-shirt.avif'];

  const sizes = (raw.sizes || ['Free Size']).map((s: any) =>
    typeof s === 'string' ? s : s.label || 'Free Size'
  );

  const similarList: SimilarProductItem[] = (raw.similarProducts || []).map((sp: any) => ({
    id: sp.id,
    image: sp.image,
    name: sp.title || raw.title
  }));

  const similar = similarList.length > 0
    ? { name: similarList[0].name || raw.title, image: similarList[0].image }
    : { name: raw.title, image: rawImages[0] };

  const breadcrumbs: Breadcrumb[] = raw.breadcrumbs || [
    { name: 'Home', url: '/' },
    { name: raw.categoryLabel || raw.category || 'Products', url: '/products' },
    { name: raw.title, url: '#' }
  ];

  return {
    id: raw.id,
    breadcrumbs,
    title: raw.title,
    price,
    originalPrice,
    discount,
    dealActive: raw.dealActive !== undefined ? raw.dealActive : true,
    secondsLeft: raw.secondsLeft || 35244,
    rating: raw.rating || 4.2,
    ratingsCount: totalRatings.toLocaleString(),
    reviewsCount: totalReviews.toLocaleString(),
    images: rawImages,
    similarProduct: similar,
    similarProducts: similarList,
    sizes,
    highlights: raw.highlights || {
      'Quality': 'Premium Fabric',
      'Fit': 'Regular Fit',
      'Wash Care': 'Machine Wash',
      'Color': 'Multi'
    },
    additionalDetails: raw.additionalDetails || {
      'Country of Origin': 'India',
      'Net Quantity (N)': '1',
      'Generic Name': raw.categoryLabel || 'Product'
    },
    seller: {
      name: raw.seller?.name || 'Verified Seller India',
      rating: raw.seller?.rating || 4.2,
      followers: (raw.seller?.followers || raw.seller?.ratingCount || 1540).toLocaleString(),
      productCount: raw.seller?.productCount || 85
    },
    ratingBreakdown,
    userReviews
  };
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, KeyValuePipe],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.scss',
})
export class ProductDetails implements OnInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly buyNowService = inject(BuyNowService);
  private readonly productService = inject(ProductService);

  private timerInterval: any;
  private cartToastTimer: ReturnType<typeof setTimeout> | undefined;
  private routeSub: Subscription | undefined;
  private galleryTouchStartX: number | null = null;

  countdownText: string = '';
  selectedImage: string = '';
  selectedIndex: number = 0;
  productData: ProductDetailsData = PRODUCT_CATALOGUE[0];
  drawerAction: 'cart' | 'buy' | null = null;
  selectedSize = '';
  selectedReturnOption: 'easy' | 'limited' = 'easy';
  isWishlisted = false;
  showCartToast = false;
  showHighlightsToast = false;
  isAdditionalDetailsOpen = false;
  showMoreInfo = false;
  pincodeInput: string = '395010';
  pincodeResult: PincodeInfo | null = null;

  readonly returnOptions = [
    {
      id: 'easy' as const,
      answer: 'Yes',
      description: 'All issue easy returns allowed',
      priceAdjustment: 0,
      returnPolicy: 'All issue easy returns'
    },
    {
      id: 'limited' as const,
      answer: 'No',
      description: 'Only wrong/defect item returns allowed',
      priceAdjustment: -23,
      returnPolicy: 'Only wrong/defect item returns allowed'
    }
  ];

  get galleryImages(): string[] {
    const images = this.productData?.images ?? [];
    if (images.length === 0) {
      return ['/assets/images/products-for-you/t-shirt.avif'];
    }
    return Array.from({ length: Math.max(3, images.length) }, (_, index) => images[index % images.length]);
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || 'p2130';
      this.loadProduct(id);
    });
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.cartToastTimer) {
      clearTimeout(this.cartToastTimer);
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadProduct(id: string): void {
    // Check fallback catalogue first for instant responsiveness
    const fallback =
      PRODUCT_CATALOGUE.find((p) => String(p.id) === String(id)) ||
      PRODUCT_CATALOGUE[0];

    this.productData = fallback;
    this.selectedImage = fallback.images[0];
    this.selectedSize = fallback.sizes[0] ?? 'Free Size';
    this.startLiveCountdown();

    // Fetch from mock API service (/api/products/:id -> product-details.json)
    this.productService.getProductById(id).subscribe({
      next: (detail) => {
        if (detail) {
          this.productData = normalizeProduct(detail);
          this.selectedImage = this.productData.images[0];
          this.selectedIndex = 0;
          this.selectedSize = this.productData.sizes[0] ?? 'Free Size';
          this.startLiveCountdown();
        }
      },
      error: () => {
        // Fallback remains active
      }
    });
  }

  selectThumbnail(img: string, index: number): void {
    this.selectedImage = img;
    this.selectedIndex = this.galleryImages.length ? index % this.galleryImages.length : 0;
  }

  showPreviousImage(): void {
    const images = this.galleryImages;
    if (images.length) {
      const index = (this.selectedIndex - 1 + images.length) % images.length;
      this.selectThumbnail(images[index], index);
    }
  }

  showNextImage(): void {
    const images = this.galleryImages;
    if (images.length) {
      const index = (this.selectedIndex + 1) % images.length;
      this.selectThumbnail(images[index], index);
    }
  }

  onGalleryTouchStart(event: TouchEvent): void {
    this.galleryTouchStartX = event.changedTouches[0]?.clientX ?? null;
  }

  onGalleryTouchEnd(event: TouchEvent): void {
    const startX = this.galleryTouchStartX;
    this.galleryTouchStartX = null;
    const endX = event.changedTouches[0]?.clientX;
    if (startX === null || endX === undefined) {
      return;
    }

    const swipeDistance = endX - startX;
    if (Math.abs(swipeDistance) > 40) {
      swipeDistance > 0 ? this.showPreviousImage() : this.showNextImage();
    }
  }

  startLiveCountdown(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.updateTimerDisplay();
    this.ngZone.runOutsideAngular(() => {
      this.timerInterval = setInterval(() => {
        this.ngZone.run(() => {
          this.updateTimerDisplay();
        });
      }, 1000);
    });
  }

  updateTimerDisplay(): void {
    if (this.productData.secondsLeft > 0) {
      this.productData.secondsLeft--;
      this.countdownText = this.formatTime(this.productData.secondsLeft);
    } else {
      this.countdownText = 'Deal Expired';
    }
  }

  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
  }

  copyHighlights(): void {
    if (!this.productData?.highlights) return;
    const lines = Object.entries(this.productData.highlights).map(
      ([k, v]) => `${k}: ${v}`
    );
    const textToCopy = `Product Highlights:\n${lines.join('\n')}`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      this.showHighlightsToast = true;
      setTimeout(() => {
        this.showHighlightsToast = false;
      }, 2000);
    }
  }

  checkDeliveryPincode(): void {
    if (!this.pincodeInput || this.pincodeInput.trim().length === 0) return;
    this.productService.checkPincode(this.pincodeInput.trim()).subscribe((res) => {
      this.pincodeResult = res;
    });
  }

  toggleMoreInfo(): void {
    this.showMoreInfo = !this.showMoreInfo;
  }

  addToCart(): void {
    this.cartService.addItem(this.createCartItem());
  }

  openActionDrawer(action: 'cart' | 'buy'): void {
    this.drawerAction = action;
  }

  closeActionDrawer(): void {
    this.drawerAction = null;
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
  }

  isProductInCart(): boolean {
    return this.cartService.items().some((item) => item.id === String(this.productData.id));
  }

  confirmDrawerAction(): void {
    if (this.drawerAction === 'cart') {
      this.addToCart();
      this.showCartToast = true;
      if (this.cartToastTimer) {
        clearTimeout(this.cartToastTimer);
      }
      this.cartToastTimer = setTimeout(() => {
        this.showCartToast = false;
      }, 2500);
      return;
    }

    if (this.drawerAction === 'buy') {
      this.buyNow();
    }
  }

  goToCart(): void {
    this.closeActionDrawer();
    this.router.navigate(['/cart']);
  }

  private createCartItem(): CartItem {
    const p = this.productData;
    const returnOption = this.returnOptions.find(
      (option) => option.id === this.selectedReturnOption
    );
    return {
      id: String(p.id),
      image: p.images[0],
      title: p.title,
      price: Math.max(p.price + (returnOption?.priceAdjustment ?? 0), 0),
      originalPrice: p.originalPrice,
      discountPercentage: `${p.discount}% Off`,
      returnPolicy: returnOption?.returnPolicy ?? this.returnOptions[0].returnPolicy,
      size: this.selectedSize,
      quantity: 1,
      soldBy: p.seller.name
    };
  }

  buyNow(): void {
    this.buyNowService.set(this.createCartItem());
    this.closeActionDrawer();
    this.router.navigate(['/bill-reviews']);
  }
}
