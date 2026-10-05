import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletHeader } from './tablet-header';

describe('TabletHeader', () => {
  let component: TabletHeader;
  let fixture: ComponentFixture<TabletHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabletHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabletHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
