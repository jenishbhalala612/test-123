import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReviews } from './bill-reviews';

describe('BillReviews', () => {
  let component: BillReviews;
  let fixture: ComponentFixture<BillReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
