import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gold',
  imports: [RouterLink],
  templateUrl: './gold.html',
  styleUrl: './gold.scss',
})
export class Gold {
  cardImages = [
    {
      URL: "/assets/images/gold-banner/jewellery.webp",
      alt: 'Jewellery'
    },
    {
      URL: "/assets/images/gold-banner/lenhengas.webp",
      alt: 'lenhengas'
    },
    {
      URL: "/assets/images/gold-banner/menswear.webp",
      alt: 'menswear'
    },
    {
      URL: "/assets/images/gold-banner/sarees.webp",
      alt: 'sarees'
    }
  ]

}
