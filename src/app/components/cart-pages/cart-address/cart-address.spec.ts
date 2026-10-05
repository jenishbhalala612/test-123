import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAddress } from './cart-address';

describe('CartAddress', () => {
  let component: CartAddress;
  let fixture: ComponentFixture<CartAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
