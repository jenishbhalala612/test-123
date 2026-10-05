import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UptoOff } from './upto-off';

describe('UptoOff', () => {
  let component: UptoOff;
  let fixture: ComponentFixture<UptoOff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UptoOff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UptoOff);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
