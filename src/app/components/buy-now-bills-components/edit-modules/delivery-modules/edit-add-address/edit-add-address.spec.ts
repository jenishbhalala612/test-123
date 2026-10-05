import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddAddressComponent } from './edit-add-address';

describe('EditAddAddressComponent', () => {
  let component: EditAddAddressComponent;
  let fixture: ComponentFixture<EditAddAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resets the form when opened in add mode', () => {
    component.addressData.name = 'Previous Recipient';
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(component.addressData.name).toBe('');
    expect(component.addressData.contactNumber).toBe('');
  });
});
