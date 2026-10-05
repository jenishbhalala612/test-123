import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackHeader } from '../../../../layout/tablet-screen/back-header/back-header';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  isAction?: boolean;
}

interface UserProfile {
  avatar: string;
  buttonText: string;
  subtitle: string;
}

@Component({
  selector: 'app-account-sidebar-module',
  standalone: true,
  imports: [CommonModule, BackHeader],
  templateUrl: './account-sidebar-module.html',
  styleUrl: './account-sidebar-module.scss',
})
export class AccountSidebarModule {
  // All data organized in JSON format
  accountData = {
    profile: {
      avatar: '/assets/images/tablet-screen/account/hello-user.png',
      buttonText: 'Sign Up',
      subtitle: 'View and update your profile details'
    } as UserProfile,
    menuItems: [
      { icon: '/assets/images/tablet-screen/account/help.png', label: 'Help', route: '/help' },
      { icon: '/assets/images/tablet-screen/account/supplier.png', label: 'Become a Supplier', route: '/become-supplier' },
      { icon: '/assets/images/tablet-screen/account/policies.png  ', label: 'Legal and Policies', route: '/legal' },
      { icon: '/assets/images/tablet-screen/account/delete.png', label: 'Delete Account', route: '/delete-account', isAction: true }
    ] as MenuItem[]
  };

  onMenuClick(item: MenuItem) {
    console.log(`Navigating to or triggering: ${item.label}`);
  }

  onAuthAction() {
    console.log('Sign Up clicked');
  }
}