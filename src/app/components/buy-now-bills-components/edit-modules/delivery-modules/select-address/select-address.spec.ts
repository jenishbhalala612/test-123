import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectAddressComponent } from './select-address';
import { EditAddAddressComponent } from '../edit-add-address/edit-add-address';

describe('SelectAddressComponent', () => {
  let component: SelectAddressComponent;
  let fixture: ComponentFixture<SelectAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens a blank form in add mode and keeps a saved address in the list', () => {
    fixture.nativeElement.querySelector('.add-address-btn').click();
    fixture.detectChanges();

    const editor = fixture.debugElement.query(By.directive(EditAddAddressComponent))
      .componentInstance as EditAddAddressComponent;
    expect(editor.mode).toBe('add');
    expect(editor.address).toBeNull();
    expect(editor.addressData).toEqual({
      name: '',
      contactNumber: '',
      houseNo: '',
      roadName: '',
      pincode: '',
      city: '',
      state: '',
      landmark: ''
    });

    editor.addressData = {
      name: 'New Recipient',
      contactNumber: '9876543210',
      houseNo: '12',
      roadName: 'Lake Road',
      pincode: '411001',
      city: 'Pune',
      state: 'Maharashtra',
      landmark: ''
    };
    editor.saveAddress();

    expect(component.addresses).toHaveLength(3);
    expect(component.addresses[2]).toEqual({
      id: 3,
      name: 'New Recipient',
      fullAddress: '12, Lake Road, Pune, Maharashtra, 411001',
      phone: '9876543210'
    });
    expect(component.isAddressFormOpen).toBe(false);
  });

  it('edits the exact selected card without creating a duplicate', () => {
    component.selectedAddressId = 1;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.edit-addr-btn').click();
    fixture.detectChanges();

    const editor = fixture.debugElement.query(By.directive(EditAddAddressComponent))
      .componentInstance as EditAddAddressComponent;
    expect(editor.mode).toBe('edit');
    expect(editor.address).toBe(component.addresses[0]);
    expect(editor.addressData.name).toBe(component.addresses[0].name);
    expect(editor.addressData.contactNumber).toBe(component.addresses[0].phone);
    expect(editor.addressData.houseNo).toBe('Plot no. 81');
    expect(editor.addressData.city).toBe('Surat');
    expect(editor.addressData.state).toBe('Gujarat');
    expect(editor.addressData.pincode).toBe('395012');

    editor.addressData.name = 'Updated Recipient';
    editor.saveAddress();

    expect(component.addresses).toHaveLength(2);
    expect(component.addresses[0].name).toBe('Updated Recipient');
    expect(component.addresses[1].name).toBe('Vijay Ambhorkar');
    expect(component.addresses[0].fullAddress).toBe(
      'Plot no. 81, Prabhu Nagar Behind Shanti Gate, Godadara, Parwat Patia Gaon Road, Udhna, Surat District, Surat, Surat, Gujarat, 395012'
    );
  });
});
