import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocation } from './delivery-location';

describe('DeliveryLocation', () => {
  let component: DeliveryLocation;
  let fixture: ComponentFixture<DeliveryLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryLocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
