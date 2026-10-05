// ─────────────────────────────────────────────
// PRODUCT MODELS & INTERFACES — product.model.ts
// ─────────────────────────────────────────────

export interface SpecialOffer {
  label: string;
  price: number;
}

export interface Product {
  id: string | number;
  title: string;
  name?: string;
  image: string;
  imageUrl?: string;
  images?: string[];
  price: number;
  mrp?: number;
  originalPrice?: number;
  discountPercent?: number;
  discount?: number;
  rating: number;
  ratingCount?: number;
  reviews?: string | number;
  reviewCount?: number;
  category: string;
  categoryLabel?: string;
  gender?: string;
  specialOffer?: SpecialOffer;
  specialOfferPrice?: number;
  freeDelivery?: boolean;
  isFreeDelivery?: boolean;
  tags?: string[];
  inStock?: boolean;
  badge?: 'bestseller' | 'new' | 'trending';

  // Card display badges & countdowns
  hasCountdown?: boolean;
  countdownText?: string;
  secondsLeft?: number;
  mallBadge?: boolean;
  deliveryText?: string;
  originalDeliveryText?: string;
  extraImagesCount?: string;
  trustedBadge?: boolean;
  trustedText?: string;
  sizes?: Array<string | { label: string; inStock: boolean }>;
}

export interface ProductDetailSize {
  label: string;
  inStock: boolean;
}

export interface SimilarProduct {
  id: string | number;
  image: string;
  name?: string;
}

export interface SellerInfo {
  id?: string;
  name: string;
  rating: number;
  ratingCount?: number;
  followers?: string;
  productCount?: number;
}

export interface RatingBreakdownItem {
  label: string;
  percentage: number;
  count: number;
}

export interface UserReview {
  id?: string;
  name?: string;
  userName?: string;
  avatar?: string | null;
  rating: number;
  date?: string;
  postedOn?: string;
  comment?: string;
  text?: string;
  images?: string[];
  helpfulCount: number;
  verifiedPurchase?: boolean;
}

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface ProductDetail {
  id: string | number;
  title: string;
  folder?: string;
  category: string;
  categoryLabel?: string;
  subCategory?: string;
  gender?: string;
  image: string;
  images: string[];
  price: number;
  mrp: number;
  originalPrice?: number;
  discountPercent: number;
  discount?: number;
  specialOffer?: SpecialOffer;
  specialOfferPrice?: number;
  freeDelivery?: boolean;
  codAvailable?: boolean;
  returnPolicy?: string;
  lowestPrice?: boolean;
  dealEndsAt?: string | null;
  dealActive?: boolean;
  secondsLeft?: number;
  rating: number;
  ratingCount: number;
  ratingsCount?: string;
  reviewCount: number;
  reviewsCount?: string;
  trusted?: boolean;
  moreCount?: number;
  sizes: Array<string | ProductDetailSize>;
  similarProducts?: SimilarProduct[];
  similarProduct?: { name: string; image: string };
  seller: SellerInfo;
  highlights: Record<string, any>;
  additionalDetails: Record<string, any>;
  ratingSummary?: {
    average: number;
    totalRatings: number;
    totalReviews: number;
    breakdown: {
      excellent: number;
      veryGood: number;
      good: number;
      average: number;
      poor: number;
    };
  };
  ratingBreakdown?: RatingBreakdownItem[];
  reviews?: UserReview[];
  userReviews?: UserReview[];
  breadcrumbs?: Breadcrumb[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  deliveryDays: number;
  cashOnDelivery: boolean;
  dispatchDays: string;
}

export interface ProductQueryParams {
  category?: string;
  gender?: string;
  q?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
