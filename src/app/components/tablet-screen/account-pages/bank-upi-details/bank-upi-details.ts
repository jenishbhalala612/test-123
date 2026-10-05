import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PaymentDetailItem {
  icon: string;
  label: string;
  actionText: string;
  route: string;
}

@Component({
  selector: 'app-bank-upi-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bank-upi-details.html',
  styleUrl: './bank-upi-details.scss',
})
export class BankUpiDetailsComponent {
  // All page text and list data structured in JSON format
  pageData = {
    headerTitle: 'MY BANK & UPI DETAILS',
    bannerText: 'Add your bank account and UPI details to receive payments.',
    items: [
      {
        icon: 'https://api.iconify.design/lucide:landmark.svg?color=%237e22ce',
        label: 'Bank Details',
        actionText: 'ADD',
        route: '/add-bank-details'
      },
      {
        icon: 'https://api.iconify.design/lucide:smartphone.svg?color=%237e22ce',
        label: 'UPI Details',
        actionText: 'ADD',
        route: '/add-upi-details'
      }
    ] as PaymentDetailItem[]
  };

  onBackClick() {
    console.log('Back button clicked');
  }

  onItemAction(item: PaymentDetailItem) {
    console.log(`Action clicked for: ${item.label} (Route: ${item.route})`);
  }
}