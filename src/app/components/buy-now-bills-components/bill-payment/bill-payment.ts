import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bill-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bill-payment.html',
  styleUrl: './bill-payment.scss'
})
export class BillPayment {
  // Saara JSON Data yahan defined hai
  readonly pageData = {
    header: {
      logo: `/assets/images/meesho-logo.png`,
      steps: [
        { stepNumber: 1, label: 'Review', active: false, completed: true },
        { stepNumber: 2, label: 'Payment', active: true, completed: false }
      ]
    },
    paymentMethods: [
      {
        id: 'cod',
        name: 'Cash on Delivery',
        amount: 148,
        icon: '💵'
      },
      {
        id: 'online',
        name: 'Pay Online',
        originalPrice: 148,
        discountPrice: 123,
        saveText: 'Save ₹25',
        bankOffer: 'Extra discount with bank offers',
        icon: '💳'
      }
    ],
    reselling: {
      title: 'Reselling the order?',
      subtitle: "Click on 'Yes' to add Final Price",
      cashCollectedTitle: 'Cash to be Collected'
    },
    priceDetails: {
      heading: 'Price Details (1 Items)',
      productPriceLabel: 'Product Price',
      productPrice: 149,
      discountLabel: 'Total Discounts',
      totalDiscount: 1,
      orderTotal: 148,
      promoBanner: '🎉 Yay! Your total discount is ₹1',
      buttonText: 'Place Order'
    }
  };

  // Aliases for template binding
  readonly headerData = this.pageData.header;
  readonly paymentMethods = this.pageData.paymentMethods;
  readonly resellingData = this.pageData.reselling;
  readonly priceDetailsData = this.pageData.priceDetails;
  readonly orderTotal = this.pageData.priceDetails.orderTotal;

  // States
  readonly selectedMethod = signal<string>('cod');
  readonly isReselling = signal<boolean>(false);
  userMargin = "";
  isInputFocused: boolean = false;

  selectPaymentMethod(id: string): void {
    this.selectedMethod.set(id);
  }

  setReselling(status: boolean): void {
    this.isReselling.set(status);
    if (!status) {
      this.userMargin;
    }
  }

  onPlaceOrder(): void {
    console.log('Placing order with method:', this.selectedMethod(), 'Margin:', this.userMargin);
  }
}