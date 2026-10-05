import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsForYouCardsContent } from './products-for-you-cards-content';

describe('ProductsForYouCardsContent', () => {
  let component: ProductsForYouCardsContent;
  let fixture: ComponentFixture<ProductsForYouCardsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsForYouCardsContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsForYouCardsContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
