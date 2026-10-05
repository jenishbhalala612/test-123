import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AppBadge {
  image: string;
  link: string;
  altText: string;
}

interface FooterLink {
  text: string;
  url: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface ContactInfo {
  title: string;
  companyName: string;
  cin: string;
  address: string;
  email: string;
  copyright: string;
}

interface FooterData {
  brandTitle: string;
  brandSubtitle: string;
  brandSubtext: string;
  appBadges: AppBadge[];
  usefulLinks: FooterLink[];
  legalLinks: FooterLink[];
  socialTitle: string;
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

  // Footer JSON data structure matching the exact Meesho layout
  footerData: FooterData = {
    brandTitle: 'Shop Non-Stop on Meesho',
    brandSubtitle: 'Trusted by crores of Indians',
    brandSubtext: 'Cash on Delivery',
    appBadges: [
      {
        image: '/assets/images/footer/playstore-icon-google.webp',
        link: 'https://play.google.com/store/apps/details?id=com.meesho.supply',
        altText: 'Get it on Google Play'
      },
      {
        image: 'https://images.meesho.com/images/pow/appstore-icon-big.webp',
        link: 'https://apps.apple.com/us/app/meesho/id1457958492',
        altText: 'Available on the App Store'
      }
    ],
    usefulLinks: [
      { text: 'Careers', url: '#' },
      { text: 'Become a supplier', url: '#' },
      { text: 'Hall of Fame', url: '#' },
      { text: 'Sitemap', url: '#' }
    ],
    legalLinks: [
      { text: 'Legal and Policies', url: '#' },
      { text: 'Meesho Tech Blog', url: '#' },
      { text: 'Notices and Returns', url: '#' }
    ],
    socialTitle: 'Reach out to us',
    socialLinks: [
      { name: 'Facebook', icon: 'https://images.meesho.com/images/pow/facebook.webp', url: '#' },
      { name: 'Instagram', icon: 'https://images.meesho.com/images/pow/instagram.webp', url: '#' },
      { name: 'YouTube', icon: 'https://images.meesho.com/images/pow/youtube.webp', url: '#' },
      { name: 'LinkedIn', icon: 'https://images.meesho.com/images/pow/linkedin.webp', url: '#' },
      { name: 'Twitter', icon: 'https://images.meesho.com/images/pow/twitter.webp', url: '#' }
    ],
    contactInfo: {
      title: 'Contact Us',
      companyName: 'Meesho Technologies Private Limited',
      cin: 'CIN: U62099KA2024PTC186568',
      address: '3rd Floor, Wing-E, Helios Business <br>Park,Kadubeesanahalli Village, Varthur Hobli, <br>Outer Ring Road Bellandur, Bangalore, <br>Bangalore South, Karnataka, India, 560103',
      email: 'legalsupport@meesho.com',
      copyright: '© 2015-2026 Meesho.com'
    }
  };

}