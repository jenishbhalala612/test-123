import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesData } from './categories-data';

describe('CategoriesData', () => {
  let component: CategoriesData;
  let fixture: ComponentFixture<CategoriesData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
