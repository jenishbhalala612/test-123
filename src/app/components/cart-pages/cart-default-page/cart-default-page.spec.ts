import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDefaultPage } from './cart-default-page';

describe('CartDefaultPage', () => {
  let component: CartDefaultPage;
  let fixture: ComponentFixture<CartDefaultPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDefaultPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDefaultPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
