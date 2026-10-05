import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankUpiDetails } from './bank-upi-details';

describe('BankUpiDetails', () => {
  let component: BankUpiDetails;
  let fixture: ComponentFixture<BankUpiDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankUpiDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankUpiDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
