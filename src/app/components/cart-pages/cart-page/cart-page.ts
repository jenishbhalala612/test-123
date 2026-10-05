import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { CartDefaultPage } from '../cart-default-page/cart-default-page';
// import { CartAddress } from '../cart-address/cart-address';
// import { CartPayment } from '../cart-payment/cart-payment';
import { Router } from '@angular/router';

interface CheckoutStep {
  stepNumber: number;
  label: string;
  active: boolean;
  completed: boolean;
}

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CartDefaultPage],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {

  constructor(private router: Router) {}

  private readonly cartService = inject(CartService);

  readonly hasItems = this.cartService.hasItems;

  // Modal state management
  readonly itemToRemove = signal<any | null>(null);

  private readonly steps: CheckoutStep[] = [
    { stepNumber: 1, label: 'Cart', active: true, completed: false },
    { stepNumber: 2, label: 'Address', active: false, completed: false },
    { stepNumber: 3, label: 'Payment', active: false, completed: false },
    { stepNumber: 4, label: 'Summary', active: false, completed: false }
  ];

  readonly pageData = computed(() => {
    const items = this.cartService.items();
    const productPrice = items.reduce((s, i) => s + i.originalPrice * i.quantity, 0);
    const totalDiscount = items.reduce((s, i) => s + (i.originalPrice - i.price) * i.quantity, 0);
    const orderTotal = productPrice - totalDiscount;
    return {
      brandLogo: 'meesho',
      steps: this.steps,
      productDetailsHeading: 'Product Details',
      cartItems: items,
      priceDetails: {
        itemCount: items.reduce((s, i) => s + i.quantity, 0),
        productPrice,
        totalDiscount,
        orderTotal,
        discountMessage: totalDiscount > 0
          ? `Yay! Your total discount is ₹${totalDiscount}`
          : 'No discounts applied',
        helperText: "Clicking on 'Continue' will not deduct any money",
        continueButtonText: 'Continue'
      }
    };
  });

  // Open modal instead of direct removal
  onRemoveClick(item: any): void {
    this.itemToRemove.set(item);
  }

  // Close modal without removing
  closeModal(): void {
    this.itemToRemove.set(null);
  }

  // Confirm removal action inside modal
  confirmRemove(): void {
    const item = this.itemToRemove();
    if (item) {
      this.cartService.removeItem(item.id);
      this.closeModal();
    }
  }

  onEditItem(itemId: string): void {
    console.log('Edit item:', itemId);
  }

  onContinue(): void {
    this.router.navigate(['/app-cart-address']);
    console.log('Proceeding to Address step...');
  }
}