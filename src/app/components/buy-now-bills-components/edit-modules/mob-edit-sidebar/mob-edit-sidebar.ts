import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductDetails {
  title: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discountText: string;
  size: string;
  quantity: number;
}

export interface ReturnOption {
  id: string;
  badgeLabel: string;
  isAllowed: boolean;
  description: string;
  price: number;
  hasSpecialOffer: boolean;
  offerText?: string;
}

@Component({
  selector: 'app-mob-edit-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mob-edit-sidebar.html',
  styleUrl: './mob-edit-sidebar.scss'
})
export class MobEditSidebarComponent {

  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() sidebarSubmitted = new EventEmitter<any>();

  // JSON Data Model matching reference UI specifications
  productData: ProductDetails = {
    title: 'FACES CANADA Weightless Stay Matte Finish Compact Powder - Ivory 01, 9g | Non Oily Matte Look | Evens Out Complexion | Prevents Acne | Blends Effortlessly | Pressed Powder For All Skin Types | Pack of 2',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80',
    currentPrice: 378,
    originalPrice: 398,
    discountText: '5% Off',
    size: 'Free Size',
    quantity: 1
  };

  returnOptions: ReturnOption[] = [
    {
      id: 'no',
      badgeLabel: 'NO',
      isAllowed: false,
      description: 'Only wrong/defect item returns allowed',
      price: 368,
      hasSpecialOffer: true,
      offerText: 'Special Offer | Save ₹10'
    },
    {
      id: 'yes',
      badgeLabel: 'YES',
      isAllowed: true,
      description: 'All issue easy returns allowed',
      price: 378,
      hasSpecialOffer: false
    }
  ];

  selectedReturnId: string = 'no';

  // Quantity Stepper handlers
  incrementQty(): void {
    this.productData.quantity++;
  }

  decrementQty(): void {
    if (this.productData.quantity > 1) {
      this.productData.quantity--;
    }
  }

  // Select return option card
  selectReturnOption(id: string): void {
    this.selectedReturnId = id;
  }

  viewDetails(): void {
    console.log('View Easy Returns details clicked');
  }

  closeSidebar(): void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  onContinue(): void {
    const payload = {
      product: this.productData,
      selectedReturnOption: this.returnOptions.find(opt => opt.id === this.selectedReturnId)
    };
    console.log('Sidebar Form Submitted Payload:', payload);
    this.sidebarSubmitted.emit(payload);
    this.closeSidebar();
  }
}