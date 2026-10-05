import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { BuyNowService } from '../../../core/services/buy-now.service';
import { Router } from '@angular/router';
import { BackHeader } from '../../../layout/tablet-screen/back-header/back-header';
import { EditSidebarComponent } from '../edit-modules/edit-sidebar/edit-sidebar';
import { SelectAddressComponent } from '../edit-modules/delivery-modules/select-address/select-address';

@Component({
  selector: 'app-bill-reviews',
  standalone: true,
  imports: [
    CommonModule,
    BackHeader,
    EditSidebarComponent,
    SelectAddressComponent
  ],
  templateUrl: './bill-reviews.html',
  styleUrl: './bill-reviews.scss',
})
export class BillReviews {

  estimatedDelivery: string = 'Saturday, 10th Oct';

  totalItemsCount: number = 1;

  // Price Details Accordion
  isPriceExpanded: boolean = false;

  // Edit Sidebar State
  isSidebarOpen: boolean = false;

  // Select Address Sidebar State
  isAddressSidebarOpen: boolean = false;

  userAddress = {
    name: 'Vijay Ambhorkar',
    addressLine:
      'Plot no. 81, Prabhu Nagar Behind Shanti Gate, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat, Surat, Gujarat - 395012',
    phone: '6355540109'
  };

  readonly product = computed(() => {

    const item = this.buyNowService.item();

    if (!item) {
      return {
        name: '',
        image: '',
        price: 0,
        originalPrice: 0,
        discountPercent: 0,
        saleTimer: '',
        size: '',
        quantity: 1,
        soldBy: ''
      };
    }

    const discount = Math.round(
      (1 - item.price / item.originalPrice) * 100
    );

    return {
      name: item.title,
      image: item.image,
      price: item.price,
      originalPrice: item.originalPrice,
      discountPercent: discount,
      saleTimer: '',
      size: item.size,
      quantity: item.quantity,
      soldBy: item.soldBy
    };

  });

  readonly productPriceTotal = computed(() => {
    const item = this.buyNowService.item();

    return item
      ? item.originalPrice * item.quantity
      : 0;
  });

  readonly totalDiscounts = computed(() => {

    const item = this.buyNowService.item();

    return item
      ? (item.originalPrice - item.price) * item.quantity
      : 0;

  });

  readonly orderTotal = computed(() => {

    const item = this.buyNowService.item();

    return item
      ? item.price * item.quantity
      : 0;

  });

  constructor(
    private buyNowService: BuyNowService,
    private router: Router
  ) {}

  // Toggle Price Details
  togglePriceDetails(): void {
    this.isPriceExpanded = !this.isPriceExpanded;
  }

  // Open Edit Sidebar
  onEditProduct(): void {
    this.isSidebarOpen = true;
  }

  // Close Edit Sidebar
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  // Receive Updated Product Details
  onUpdateItem(data: any): void {
    console.log('Updated Product:', data);
    this.isSidebarOpen = false;
  }

  // Open Address Sidebar when "Change" button is clicked
  onChangeAddress(): void {
    this.isAddressSidebarOpen = true;
  }

  // Handle selected address from the drawer
  onAddressSelected(selectedAddress: any): void {
    this.userAddress = {
      name: selectedAddress.name,
      addressLine: selectedAddress.fullAddress,
      phone: selectedAddress.phone
    };
    console.log('Address updated to:', selectedAddress);
  }

  // Handle click on "+ ADD NEW ADDRESS"
  onAddNewAddressClicked(): void {
    console.log('Add new address clicked');
    // Yahan aap naya address form kholne ki logic likh sakte hain
  }

  onProceedToPayment(): void {
    this.router.navigate(['/bill-payment']);
  }

}