
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface AddressRecord {
  id: number;
  name: string;
  fullAddress: string;
  phone: string;
}

export interface AddressFormSubmission {
  name: string;
  contactNumber: string;
  houseNo: string;
  roadName: string;
  pincode: string;
  city: string;
  state: string;
  landmark: string;
  fullAddress: string;
}

@Component({
  selector: 'app-edit-add-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-add-address.html',
  styleUrl: './edit-add-address.scss'
})
export class EditAddAddressComponent implements OnChanges {

  @Input() isOpen: boolean = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() address: AddressRecord | null = null;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() addressSaved = new EventEmitter<AddressFormSubmission>();

  // Location popup and error toast
  isFetchingLocation: boolean = false;
  showLocationError: boolean = false;

  // State dropdown
  isStateDropdownOpen: boolean = false;

  // Address form data
  addressData: Omit<AddressFormSubmission, 'fullAddress'> = {
    name: '',
    contactNumber: '',
    houseNo: '',
    roadName: '',
    pincode: '',
    city: '',
    state: '',
    landmark: ''
  };

  private originalAddressData:
    Omit<AddressFormSubmission, 'fullAddress'> | null = null;

  private originalFullAddress = '';

  // State list
  statesList: string[] = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Punjab',
    'Rajasthan',
    'Tamil Nadu',
    'Telangana',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue) {
      this.isStateDropdownOpen = false;

      if (this.mode === 'edit' && this.address) {
        this.populateAddress(this.address);
      } else {
        this.resetAddress();
      }
    }

    // Also refresh form if a different address is passed while open
    if (
      this.isOpen &&
      changes['address'] &&
      this.mode === 'edit' &&
      this.address
    ) {
      this.populateAddress(this.address);
    }

    if (changes['mode'] && this.isOpen) {
      if (this.mode === 'edit' && this.address) {
        this.populateAddress(this.address);
      } else if (this.mode === 'add') {
        this.resetAddress();
      }
    }
  }

  // Toggle state dropdown
  toggleStateDropdown(): void {
    this.isStateDropdownOpen = !this.isStateDropdownOpen;
  }

  // Select state
  selectState(state: string): void {
    this.addressData.state = state;
    this.isStateDropdownOpen = false;
  }

  // Close sidebar
  closeSidebar(): void {
    this.isOpenChange.emit(false);
    this.isStateDropdownOpen = false;
  }

  // Use My Location
  fetchLocation(): void {
    // Reset previous error and show fetching popup
    this.isFetchingLocation = true;
    this.showLocationError = false;

    // Hide fetching popup after 1.5 seconds
    setTimeout(() => {
      this.isFetchingLocation = false;

      // Show error message at the bottom of sidebar
      this.showLocationError = true;

      // Automatically hide error after 4 seconds
      setTimeout(() => {
        this.showLocationError = false;
      }, 1500);

    }, 1500);
  }

  // Save address
  saveAddress(): void {
    this.addressSaved.emit({
      ...this.addressData,
      fullAddress: this.getFullAddress()
    });

    this.closeSidebar();
  }

  // Reset form for new address
  private resetAddress(): void {
    this.addressData = {
      name: '',
      contactNumber: '',
      houseNo: '',
      roadName: '',
      pincode: '',
      city: '',
      state: '',
      landmark: ''
    };

    this.originalAddressData = null;
    this.originalFullAddress = '';
    this.isStateDropdownOpen = false;
  }

  // Populate form for editing existing address
  private populateAddress(address: AddressRecord): void {
    const parts = address.fullAddress
      .split(',')
      .map(part => part.trim())
      .filter(Boolean);

    const pincodeIndex = parts.findIndex(part => /^\d{6}$/.test(part));
    const pincode =
      pincodeIndex >= 0 ? parts.splice(pincodeIndex, 1)[0] : '';

    const stateIndex = parts.findIndex(part =>
      this.statesList.some(
        state => state.toLowerCase() === part.toLowerCase()
      )
    );

    const state = stateIndex >= 0 ? parts[stateIndex] : '';
    const cityIndex = stateIndex > 0 ? stateIndex - 1 : -1;

    this.addressData = {
      name: address.name,
      contactNumber: address.phone,
      houseNo: parts[0] ?? '',
      roadName: stateIndex >= 0
        ? parts.slice(1, cityIndex).join(', ')
        : parts.slice(1).join(', '),
      pincode,
      city: cityIndex >= 0 ? parts[cityIndex] : '',
      state,
      landmark: ''
    };

    this.originalAddressData = { ...this.addressData };
    this.originalFullAddress = address.fullAddress;
  }

  // Create complete address string
  private getFullAddress(): string {
    if (
      this.mode === 'edit' &&
      this.originalAddressData &&
      this.addressData.name === this.originalAddressData.name &&
      this.addressData.contactNumber === this.originalAddressData.contactNumber &&
      this.addressData.houseNo === this.originalAddressData.houseNo &&
      this.addressData.roadName === this.originalAddressData.roadName &&
      this.addressData.pincode === this.originalAddressData.pincode &&
      this.addressData.city === this.originalAddressData.city &&
      this.addressData.state === this.originalAddressData.state &&
      this.addressData.landmark === this.originalAddressData.landmark
    ) {
      return this.originalFullAddress;
    }

    return [
      this.addressData.houseNo,
      this.addressData.roadName,
      this.addressData.landmark,
      this.addressData.city,
      this.addressData.state,
      this.addressData.pincode
    ]
      .filter(part => part.trim())
      .join(', ');
  }
}