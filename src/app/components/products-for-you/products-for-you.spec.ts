import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsForYou } from './products-for-you';

describe('ProductsForYou', () => {
  let component: ProductsForYou;
  let fixture: ComponentFixture<ProductsForYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsForYou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsForYou);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
