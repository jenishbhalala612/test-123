import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-header',
  imports: [],
  templateUrl: './back-header.html',
  styleUrl: './back-header.scss',
})
export class BackHeader {

  @Input() title: string = '';

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}