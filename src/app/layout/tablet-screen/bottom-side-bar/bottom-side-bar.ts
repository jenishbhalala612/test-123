import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-side-bar.html',
  styleUrl: './bottom-side-bar.scss',
})
export class BottomSideBarComponent {
  // Track which tab is currently selected (default to 0 for the first tab)
  activeIndex: number = 0;

  tabsData = [
    {
      URLFirst: '/assets/images/tablet-screen/bottom-aside-bars/home/home.png',
      URLSec: '/assets/images/tablet-screen/bottom-aside-bars/home/home2.png',
      text: 'Home'
    },
    {
      URLFirst: '/assets/images/tablet-screen/bottom-aside-bars/category.png',
      text: 'Category'
    },
    {
      URLFirst: '/assets/images/tablet-screen/bottom-aside-bars/mallTabIcon.webp',
      text: 'Mall'
    },
    {
      URLFirst: '/assets/images/tablet-screen/bottom-aside-bars/help.png',
      text: 'Help'
    },
    {
      URLFirst: '/assets/images/tablet-screen/bottom-aside-bars/account/account.png',
      URLSec: '/assets/images/tablet-screen/bottom-aside-bars/account/account2.png',
      text: 'Account'
    },
  ];

  selectTab(index: number) {
    this.activeIndex = index;
  }
}