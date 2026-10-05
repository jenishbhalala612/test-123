import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(public router: Router) { }

  get isAuthPage(): boolean {
    return this.router.url.startsWith('/supplier')
      || this.router.url.startsWith('/investor-relations')
      || this.router.url.startsWith('/cart')
      || this.router.url.startsWith('/bill')
      || this.router.url.startsWith('/signup');
  }
}
