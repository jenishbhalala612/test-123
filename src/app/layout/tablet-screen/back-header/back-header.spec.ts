import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackHeader } from './back-header';

describe('BackHeader', () => {
  let component: BackHeader;
  let fixture: ComponentFixture<BackHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
