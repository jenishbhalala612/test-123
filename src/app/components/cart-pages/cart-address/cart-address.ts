import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface AddressItem {
  id: string;
  name: string;
  fullAddress: string;
  phone: string;
  selected: boolean;
  houseNo?: string;
  area?: string;
  pincode?: string;
  city?: string;
  state?: string;
  landmark?: string;
}

@Component({
  selector: 'app-cart-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-address.html',
  styleUrl: './cart-address.scss'
})
export class CartAddress {

  constructor(private router: Router) {};
  readonly steps = [
    { stepNumber: 1, label: 'Cart',    active: false, completed: true },
    { stepNumber: 2, label: 'Address', active: true,  completed: false },
    { stepNumber: 3, label: 'Payment', active: false, completed: false },
    { stepNumber: 4, label: 'Summary', active: false, completed: false }
  ];

  readonly addresses = signal<AddressItem[]>([
    {
      id: 'addr-1',
      name: 'Vijay Ambhorkar',
      fullAddress: 'Plot no. 81, Prabhu Nagar Behind Shanti Gate, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat, Surat, Gujarat, 395012',
      phone: '6355540109',
      selected: true,
      houseNo: 'Plot no. 81',
      area: 'Prabhu Nagar Behind Shanti Gate, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat',
      pincode: '395012',
      city: 'Surat',
      state: 'Gujarat',
      landmark: ''
    },
    {
      id: 'addr-2',
      name: 'Vijay Ambhorkar',
      fullAddress: '81, Sky 9 Living, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat, Surat, Gujarat, 395012',
      phone: '6355540109',
      selected: false,
      houseNo: '81',
      area: 'Sky 9 Living, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat',
      pincode: '395012',
      city: 'Surat',
      state: 'Gujarat',
      landmark: ''
    }
  ]);

  // Drawer control signals
  readonly isDrawerOpen = signal<boolean>(false);
  readonly isEditMode = signal<boolean>(false);
  readonly editingAddressId = signal<string | null>(null);

  // Form Fields Binding
  formName = '';
  formPhone = '';
  formHouseNo = '';
  formArea = '';
  formPincode = '';
  formCity = '';
  readonly formState = signal<string>('');
  formLandmark = '';

  // Custom State Dropdown State & List
  readonly isStateDropdownOpen = signal<boolean>(false);
  
  readonly statesList: string[] = [
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

  readonly itemCount = signal<number>(1);
  readonly productPrice = signal<number>(169);
  readonly orderTotal = computed(() => this.productPrice());

  selectAddress(id: string): void {
    this.addresses.update(list =>
      list.map(addr => ({ ...addr, selected: addr.id === id }))
    );
  }

  openAddAddressDrawer(): void {
    this.isEditMode.set(false);
    this.editingAddressId.set(null);
    this.clearForm();
    this.isDrawerOpen.set(true);
  }

  openEditAddressDrawer(addr: AddressItem): void {
    this.isEditMode.set(true);
    this.editingAddressId.set(addr.id);
    
    // Pre-fill form with selected address details[cite: 7]
    this.formName = addr.name;
    this.formPhone = addr.phone;
    this.formHouseNo = addr.houseNo || '';
    this.formArea = addr.area || '';
    this.formPincode = addr.pincode || '';
    this.formCity = addr.city || '';
    this.formState.set(addr.state || '');
    this.formLandmark = addr.landmark || '';

    this.isDrawerOpen.set(true);
  }

  closeAddAddressDrawer(): void {
    this.isDrawerOpen.set(false);
    this.isStateDropdownOpen.set(false);
  }

  clearForm(): void {
    this.formName = '';
    this.formPhone = '';
    this.formHouseNo = '';
    this.formArea = '';
    this.formPincode = '';
    this.formCity = '';
    this.formState.set('');
    this.formLandmark = '';
  }

  toggleStateDropdown(): void {
    this.isStateDropdownOpen.update(val => !val);
  }

  selectState(stateName: string): void {
    this.formState.set(stateName);
    this.isStateDropdownOpen.set(false);
  }

  saveAddress(): void {
    const fullCombinedAddress = `${this.formHouseNo}, ${this.formArea}, ${this.formCity}, ${this.formState()}, ${this.formPincode}`;

    if (this.isEditMode() && this.editingAddressId()) {
      // Update existing address
      this.addresses.update(list =>
        list.map(addr => {
          if (addr.id === this.editingAddressId()) {
            return {
              ...addr,
              name: this.formName,
              phone: this.formPhone,
              fullAddress: fullCombinedAddress,
              houseNo: this.formHouseNo,
              area: this.formArea,
              pincode: this.formPincode,
              city: this.formCity,
              state: this.formState(),
              landmark: this.formLandmark
            };
          }
          return addr;
        })
      );
    } else {
      // Add new address
      const newAddr: AddressItem = {
        id: 'addr-' + Date.now(),
        name: this.formName,
        phone: this.formPhone,
        fullAddress: fullCombinedAddress,
        houseNo: this.formHouseNo,
        area: this.formArea,
        pincode: this.formPincode,
        city: this.formCity,
        state: this.formState(),
        landmark: this.formLandmark,
        selected: false
      };
      this.addresses.update(list => [...list, newAddr]);
    }

    this.closeAddAddressDrawer();
  }

  onDeliverHere(addr: AddressItem): void {
    this.router.navigate(['/app-cart-payment']);
    console.log('Proceeding to payment with address:', addr);
  }
}