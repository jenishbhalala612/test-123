import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Userverifyotp } from '../userverifyotp/userverifyotp';

interface SignPageContent {
  brandName: string;
  headerTitle: string;
  phonePlaceholder: string;
  buttonText: string;
  termsTextPrefix: string;
  termsLinkText: string;
  privacyLinkText: string;
  termsTextSuffix: string;
}

@Component({
  selector: 'app-signpage',
  standalone: true,
  imports: [CommonModule, FormsModule, Userverifyotp],
  templateUrl: './signpage.html',
  styleUrl: './signpage.scss',
})
export class Signpage {
  mobileNumber: string = '';

  pageData: SignPageContent = {
    brandName: 'Meesho',
    headerTitle: 'Sign Up to view your cart items',
    phonePlaceholder: 'Phone Number',
    buttonText: 'Continue',
    termsTextPrefix: 'By continuing, you agree to ',
    termsLinkText: "Meesho's Terms & Conditions",
    privacyLinkText: 'Privacy Policy',
    termsTextSuffix: '.'
  };

  constructor(private router: Router, private auth: AuthService) { }

  onContinue(): void {
    if (this.mobileNumber.trim().length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    this.auth.login({ name: 'User', mobile: this.mobileNumber.trim() });

    //verify-otp component jump 
    this.router.navigate(['/verify-otp'], {
      state: { mobile: this.mobileNumber.trim() }
    });
  }
}