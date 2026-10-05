import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import {
  Product,
  ProductDetail,
  Category,
  PincodeInfo,
  ProductQueryParams,
  UserReview
} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);

  // Reactive state signals
  readonly products = signal<Product[]>([]);
  readonly currentProduct = signal<ProductDetail | null>(null);
  readonly categories = signal<Category[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  /**
   * Fetches products with optional category, search, sorting, and pagination
   */
  getProducts(params?: ProductQueryParams): Observable<Product[]> {
    this.isLoading.set(true);
    let httpParams = new HttpParams();

    if (params?.category) {
      httpParams = httpParams.set('category', params.category);
    }
    if (params?.gender) {
      httpParams = httpParams.set('gender', params.gender);
    }
    if (params?.q) {
      httpParams = httpParams.set('q', params.q);
    }
    if (params?.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get<Product[]>('/api/products', { params: httpParams }).pipe(
      tap((data) => {
        this.products.set(data);
        this.isLoading.set(false);
        this.errorMessage.set(null);
      }),
      catchError((err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Failed to load products');
        return of([]);
      })
    );
  }

  /**
   * Fetches detailed information for a single product by ID
   */
  getProductById(id: string | number): Observable<ProductDetail> {
    this.isLoading.set(true);
    return this.http.get<ProductDetail>(`/api/products/${id}`).pipe(
      tap((detail) => {
        this.currentProduct.set(detail);
        this.isLoading.set(false);
      }),
      catchError((err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Failed to load product details');
        throw err;
      })
    );
  }

  /**
   * Fetches reviews for a specific product
   */
  getProductReviews(id: string | number): Observable<UserReview[]> {
    return this.http.get<UserReview[]>(`/api/products/${id}/reviews`).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Fetches all product categories
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories').pipe(
      tap((cats) => this.categories.set(cats)),
      catchError(() => of([]))
    );
  }

  /**
   * Simulates checking delivery status for a pincode
   */
  checkPincode(code: string): Observable<PincodeInfo> {
    return this.http.get<PincodeInfo>(`/api/pincodes/${code}`).pipe(
      catchError(() =>
        of({
          pincode: code,
          city: 'Standard Delivery',
          state: 'India',
          deliveryDays: 3,
          cashOnDelivery: true,
          dispatchDays: '1 day'
        })
      )
    );
  }
}
