import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCards } from './cat-cards';

describe('CatCards', () => {
  let component: CatCards;
  let fixture: ComponentFixture<CatCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
