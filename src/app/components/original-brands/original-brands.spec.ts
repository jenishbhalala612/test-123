import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalBrands } from './original-brands';

describe('OriginalBrands', () => {
  let component: OriginalBrands;
  let fixture: ComponentFixture<OriginalBrands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginalBrands]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginalBrands);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
