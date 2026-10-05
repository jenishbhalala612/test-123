import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-userverifyotp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userverifyotp.html',
  styleUrl: './userverifyotp.scss',
})
export class Userverifyotp implements OnInit, OnDestroy {
  mobileNumber: string = '6355540109'; // Dynamic mobile number
  otpDigits: string[] = ['', '', '', '', '', ''];
  countdownTimer: number = 60; // 1 minute (60 seconds)
  private timerInterval: any;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startCountdown(): void {
    this.countdownTimer = 60;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      if (this.countdownTimer > 0) {
        this.countdownTimer--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  onOtpInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;
    if (value && index < 5) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  changeNumber(): void {
    this.router.navigate(['/signup']);
  }

  resendOtp(): void {
    alert('OTP Resent Successfully!');
    this.startCountdown();
  }

  onVerify(): void {
    const fullOtp = this.otpDigits.join('');
    if (fullOtp.length !== 6) {
      alert('Please enter a valid 6-digit OTP.');
      return;
    }
    this.auth.login({ name: 'User', mobile: this.mobileNumber });
    this.router.navigate(['/']);
  }
}