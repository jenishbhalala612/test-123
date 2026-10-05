import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCards } from './logo-cards';

describe('LogoCards', () => {
  let component: LogoCards;
  let fixture: ComponentFixture<LogoCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
