import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  AddressFormSubmission,
  AddressRecord,
  EditAddAddressComponent
} from '../edit-add-address/edit-add-address';

@Component({
  selector: 'app-select-address',
  standalone: true,
  imports: [EditAddAddressComponent],
  templateUrl: './select-address.html',
  styleUrl: './select-address.scss',
})
export class SelectAddressComponent {

  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() addressSelected = new EventEmitter<AddressRecord>();
  @Output() addNewAddressClick = new EventEmitter<void>();

  // Sample Saved Addresses (Matching your reference screenshot info[cite: 4])
  addresses: AddressRecord[] = [
    {
      id: 1,
      name: 'Vijay Ambhorkar',
      fullAddress: 'Plot no. 81, Prabhu Nagar Behind Shanti Gate, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat, Surat, Gujarat, 395012',
      phone: '6355540109'
    },
    {
      id: 2,
      name: 'Vijay Ambhorkar',
      fullAddress: '81, Sky 9 Living, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat, Surat, Gujarat, 395012',
      phone: '6355540109'
    }
  ];

  selectedAddressId: number = 2; // Default selected address ID matching screenshot
  isAddressFormOpen = false;
  addressFormMode: 'add' | 'edit' = 'add';
  editingAddress: AddressRecord | null = null;

  // Close Sidebar
  closeSidebar(): void {
    this.isOpenChange.emit(false);
  }

  // Select an address card
  selectAddress(id: number): void {
    this.selectedAddressId = id;
  }

  // Trigger Add New Address
  addNewAddress(): void {
    this.editingAddress = null;
    this.addressFormMode = 'add';
    this.isAddressFormOpen = true;
    this.addNewAddressClick.emit();
  }

  // Edit Address action
  editAddress(address: AddressRecord, event: Event): void {
    event.stopPropagation();
    this.editingAddress = address;
    this.addressFormMode = 'edit';
    this.isAddressFormOpen = true;
  }

  saveAddress(details: AddressFormSubmission): void {
    if (this.editingAddress) {
      const editedAddress = this.editingAddress;
      this.addresses = this.addresses.map(address =>
        address.id === editedAddress.id
          ? {
              id: editedAddress.id,
              name: details.name,
              fullAddress: details.fullAddress,
              phone: details.contactNumber
            }
          : address
      );
    } else {
      const id = Math.max(0, ...this.addresses.map(address => address.id)) + 1;
      this.addresses = [
        ...this.addresses,
        {
          id,
          name: details.name,
          fullAddress: details.fullAddress,
          phone: details.contactNumber
        }
      ];
      this.selectedAddressId = id;
    }

    this.editingAddress = null;
    this.isAddressFormOpen = false;
  }

  // Confirm and Deliver to selected address
  deliverToThisAddress(event: Event): void {
    event.stopPropagation();
    const chosenAddress = this.addresses.find(addr => addr.id === this.selectedAddressId);
    if (chosenAddress) {
      this.addressSelected.emit(chosenAddress);
    }
    this.closeSidebar();
  }

}