import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSidebar } from './edit-sidebar';

describe('EditSidebar', () => {
  let component: EditSidebar;
  let fixture: ComponentFixture<EditSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
