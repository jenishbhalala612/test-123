import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-default-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-default-page.html',
  styleUrls: ['./cart-default-page.scss']
})
export class CartDefaultPage {
  constructor(private router: Router) {}

  onStartShopping(): void {
    this.router.navigate(['/']);
  }
}