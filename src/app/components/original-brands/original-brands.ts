import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-original-brands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './original-brands.html',
  styleUrl: './original-brands.scss',
})
export class OriginalBrands {
  // Reference to the scrollable brand images container
  @ViewChild('brandScrollContainer') brandScrollContainer!: ElementRef<HTMLDivElement>;

  // Method to handle left and right smooth scrolling via buttons
  scrollContainer(direction: 'left' | 'right') {
    const container = this.brandScrollContainer.nativeElement;
    const scrollAmount = 300; // Pixel offset per scroll action

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  brandsImages = [
    {
      URL: "/assets/images/original-brands/bags.webp",
      alt: "bags"
    },
    {
      URL: "/assets/images/original-brands/books.webp",
      alt: "books"
    },
    {
      URL: "/assets/images/original-brands/electronics.webp",
      alt: "electronics"
    },
    {
      URL: "/assets/images/original-brands/makeup.webp",
      alt: "makeup"
    },
    {
      URL: "/assets/images/original-brands/footwear.webp",
      alt: "footwear"
    },
    {
      URL: "/assets/images/original-brands/men-perfumes.webp",
      alt: "men-perfumes"
    }, 
    {
      URL: "/assets/images/original-brands/personal-care.webp",
      alt: "personal care"
    },
    {
      URL: "/assets/images/original-brands/smart-phones.webp",
      alt: "smart phone"
    }
  ];
}