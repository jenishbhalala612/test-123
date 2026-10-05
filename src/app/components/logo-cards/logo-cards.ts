import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-cards.html',
  styleUrl: './logo-cards.scss',
})
export class LogoCards {
  logoImgs = [
    {
      URl: "/assets/images/logo/logo.webp",
      name: "logo"
    },
    {
      URl: "/assets/images/logo/logo.webp",
      name: "logo"
    },
    {
      URl: "/assets/images/logo/logo.webp",
      name: "logo"
    },
    {
      URl: "/assets/images/logo/logo.webp",
      name: "logo"
    },
    {
      URl: "/assets/images/logo/logo.webp",
      name: "logo"
    },
    {
      URl: "/assets/images/logo/logo.webp",
      name: "logo"
    },
    {
      URl: "/assets/images/logo/logo.webp",
      name: "logo"
    },
  ];

  // Getter to duplicate the array elements for seamless infinite scrolling loop
  get duplicatedLogoImgs() {
    return [...this.logoImgs, ...this.logoImgs];
  }
}