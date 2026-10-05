import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-upto-off',
  imports: [RouterLink],
  templateUrl: './upto-off.html',
  styleUrl: './upto-off.scss',
})
export class UptoOff {
  cardImages = [
    {
      URL: "/assets/images/upto-off/trending.webp",
      name: "TRENDING"
    },
    {
      URL: "/assets/images/upto-off/trending.webp",
      name: "TRENDING"
    },
    {
      URL: "/assets/images/upto-off/trending.webp",
      name: "TRENDING"
    },
    {
      URL: "/assets/images/upto-off/trending.webp",
      name: "TRENDING"
    }

  ]
}
