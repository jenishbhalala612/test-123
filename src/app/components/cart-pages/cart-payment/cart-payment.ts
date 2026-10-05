import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- 

@Component({
  selector: 'app-cart-payment',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- 
  templateUrl: './cart-payment.html',
  styleUrl: './cart-payment.scss'
})
export class CartPayment {
  readonly steps = [
    { stepNumber: 1, label: 'Cart', active: false, completed: true },
    { stepNumber: 2, label: 'Address', active: false, completed: true },
    { stepNumber: 3, label: 'Payment', active: true, completed: false },
    { stepNumber: 4, label: 'Summary', active: false, completed: false }
  ];

  readonly selectedMethod = signal<'cod' | 'online'>('cod');
  readonly isReselling = signal<boolean>(false);

  // New properties for margin calculation
  userMargin = '';
  isInputFocused: boolean = false;

  selectPaymentMethod(method: 'cod' | 'online'): void {
    this.selectedMethod.set(method);
  }

  setReselling(status: boolean): void {
    this.isReselling.set(status);
    if (!status) {
      this.userMargin; // Reset margin if 'No' is clicked
    }
  }

  onContinuePayment(): void {
    console.log('Continuing payment with method:', this.selectedMethod(), 'Margin:', this.userMargin);
  }
}