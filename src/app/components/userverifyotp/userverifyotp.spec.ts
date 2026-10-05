import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userverifyotp } from './userverifyotp';

describe('Userverifyotp', () => {
  let component: Userverifyotp;
  let fixture: ComponentFixture<Userverifyotp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userverifyotp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userverifyotp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
