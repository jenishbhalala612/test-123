import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gold } from './gold';

describe('Gold', () => {
  let component: Gold;
  let fixture: ComponentFixture<Gold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gold]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gold);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
