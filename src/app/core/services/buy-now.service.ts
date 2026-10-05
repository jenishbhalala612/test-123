import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart.service';

@Injectable({ providedIn: 'root' })
export class BuyNowService {
  private _item = signal<CartItem | null>(null);
  readonly item = this._item.asReadonly();

  set(item: CartItem): void {
    this._item.set(item);
  }

  clear(): void {
    this._item.set(null);
  }
}
