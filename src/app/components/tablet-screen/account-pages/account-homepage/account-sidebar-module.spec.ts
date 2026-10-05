import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSidebarModule } from './account-sidebar-module';

describe('AccountSidebarModule', () => {
  let component: AccountSidebarModule;
  let fixture: ComponentFixture<AccountSidebarModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSidebarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSidebarModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
