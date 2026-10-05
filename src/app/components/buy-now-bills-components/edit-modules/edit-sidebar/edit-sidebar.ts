import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './edit-sidebar.html',
  styleUrl: './edit-sidebar.scss',
})
export class EditSidebarComponent {

  @Input() isOpen: boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();

  @Output() updateItem = new EventEmitter<any>();

  // Product Data matching your reference items exactly
  product = {
    name: 'FACES CANADA Weightless Stay Matte Finish Compact Powder - Ivory 01, 9g | SPF 20 | Non Oily...',
    price: 161,
    originalPrice: 199,
    discount: '19% Off',
    image: 'assets/product-placeholder.jpg'
  };

  // Size Options
  availableSizes: string[] = ['Free Size', 'S', 'M', 'L', 'XL'];

  selectedSize: string = 'Free Size';

  isDropdownOpen: boolean = false;

  // Quantity bounded between min 1 and max 10
  quantity: number = 1;

  // Close Sidebar
  closeSidebar(): void {
    this.isOpenChange.emit(false);
    this.isDropdownOpen = false;
  }

  // Toggle Dropdown
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Select Size
  selectSize(size: string, event: Event): void {
    event.stopPropagation();
    this.selectedSize = size;
    this.isDropdownOpen = false;
  }

  // Increase Quantity (Max limit 10)
  increaseQty(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  // Decrease Quantity (Min limit 1)
  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Calculate Total Price
  getTotalPrice(): number {
    return this.product.price * this.quantity;
  }

  // Continue
  onContinue(): void {
    const updatedData = {
      size: this.selectedSize,
      quantity: this.quantity,
      totalPrice: this.getTotalPrice()
    };

    this.updateItem.emit(updatedData);
    this.closeSidebar();
  }

}