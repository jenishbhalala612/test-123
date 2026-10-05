import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobEditSidebar } from './mob-edit-sidebar';

describe('MobEditSidebar', () => {
  let component: MobEditSidebar;
  let fixture: ComponentFixture<MobEditSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobEditSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobEditSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
