import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage: string;
  returnPolicy: string;
  size: string;
  quantity: number;
  soldBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_STORAGE_KEY = 'meesho_cart_items';
  private readonly platformId = inject(PLATFORM_ID);

  private _items = signal<CartItem[]>(this.loadCart());

  readonly items = this._items.asReadonly();

  readonly count = computed(() =>
    this._items().reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  );

  readonly hasItems = computed(() => this._items().length > 0);

  addItem(item: CartItem): void {
    this._items.update(currentItems => {
      const existingItem = currentItems.find(
        cartItem => cartItem.id === item.id
      );

      const updatedItems = existingItem
        ? currentItems.map(cartItem =>
          cartItem.id === item.id
            ? {
              ...cartItem,
              quantity: cartItem.quantity + 1
            }
            : cartItem
        )
        : [...currentItems, item];

      this.saveCart(updatedItems);

      return updatedItems;
    });
  }

  removeItem(id: string): void {
    this._items.update(currentItems => {
      const updatedItems = currentItems.filter(
        cartItem => cartItem.id !== id
      );

      this.saveCart(updatedItems);

      return updatedItems;
    });
  }

  private saveCart(cartItems: CartItem[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(
      this.CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }

  private loadCart(): CartItem[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    try {
      const storedCartItems = localStorage.getItem(
        this.CART_STORAGE_KEY
      );

      return storedCartItems
        ? JSON.parse(storedCartItems)
        : [];
    } catch {
      return [];
    }
  }
}
