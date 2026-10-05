import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSideBar } from './bottom-side-bar';

describe('BottomSideBar', () => {
  let component: BottomSideBar;
  let fixture: ComponentFixture<BottomSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSideBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
