import {
  Component,
  signal,
  computed,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { TabletHeaderComponent } from '../tablet-screen/tablet-header/tablet-header';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TabletHeaderComponent
],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  /* =========================================================
     HEADER STATE
     ========================================================= */

  searchQuery = signal('');
  isScrolled = signal(false);
  profileOpen = signal(false);
  searchFocused = signal(false);
  activeCategoryIndex = signal<number | null>(null);


  /* =========================================================
     UI TEXT
     ========================================================= */

  readonly ui = {
    profileGuest: {
      greeting: 'Hello User',
      subtitle: 'To access your account',
      signUpBtn: 'Sign Up',
      myOrders: 'My Orders',
      deleteAccount: 'Delete Account'
    },

    profileLoggedIn: {
      myOrders: 'My Orders',
      logout: 'Logout',
      deleteAccount: 'Delete Account'
    }
  };


  /* =========================================================
     SEARCH DATA
     ========================================================= */

  readonly popularSearches = [
    'Saree',
    'Kurti',
    'Lehenga',
    'Tops',
    'Jeans',
    'Dress',
    'Ethnic Wear',
    'Jewellery',
    'Handbag'
  ];


  /* =========================================================
     CATEGORIES
     
     IMPORTANT:
     Your existing categories array remains unchanged.
     Paste the complete categories array from your current
     header.ts here.
     ========================================================= */

  readonly categories = [
    {
      name: 'Popular',
      columns: [
        { title: 'Featured On Meesho', items: ['Top Brands', 'Shimla Apples'] },
        { title: 'All Popular', items: ['Jewellery', 'Men Fashion', 'Kids', 'Footwear', 'Beauty & Personal Care', 'Grocery', 'Electronics', 'Innerwear & Nightwear', 'Kitchen & Appliances', 'Bags & Luggage', 'Healthcare', 'Stationery & Office Supplies', 'Bike & Car', 'Furniture'] }
      ]
    },
    {
      name: 'Kurti, Saree & Lehenga',
      columns: [
        { title: 'Sarees', items: ['All Sarees', 'Georgette Sarees', 'Chiffon Sarees', 'Cotton Sarees', 'Net Sarees', 'Silk Sarees', 'New Collection', 'Bridal Sarees'] },
        { title: 'Kurtis', items: ['All Kurtis', 'Anarkali Kurtis', 'Rayon Kurtis', 'Cotton Kurtis', 'Straight Kurtis', 'Long Kurtis'] },
        { title: 'Kurta Sets', items: ['All Kurta Sets', 'Kurta Palazzo Sets', 'Kurta Pant Sets', 'Sharara Sets', 'Anarkali Kurta Sets', 'Cotton Kurta Sets'] },
        { title: 'Dupatta Sets', items: ['All Dupatta Sets', 'Cotton Sets', 'Rayon Sets'] },
        { title: 'Suits & Dress Material', items: ['All Dress Materials', 'Pakistani Dress Materials', 'Cotton Dress Materials', 'Patiala Dress Materials', 'Banarasi Dress Materials', 'Party Wear Dress Materials'] },
        { title: 'Lehengas', items: ['All Lehengas', 'Shoppers Favourite', 'Trending Lehengas'] },
        { title: 'Blouses', items: ['All Blouses', 'Shoppers Favourite', 'Trending Blouses'] },
        { title: 'Gowns', items: ['All Gowns', 'Shoppers Favourite', 'Trending Gowns'] },
        { title: 'Other Ethnic Wear', items: ['Ethnic Skirts & Bottomwear', 'Ethnic Jackets & Shrugs', 'Islamic Fashion', 'Petticoats', 'Blouse Pieces', 'Dupattas'] }
      ]
    },
    {
      name: 'Women Western',
      columns: [
        { title: 'Topwear', items: ['All Topwear', 'Tops & Tunics', 'Dresses', 'T-shirts', 'Gowns', 'Tops & Bottom Sets', 'Shirts', 'Jumpsuits', 'New Trends'] },
        { title: 'Bottom Wear', items: ['All Bottomwear', 'Jeans & Jeggings', 'Palazzos', 'Trousers & Pants', 'Leggings', 'Shorts & Skirts'] },
        { title: 'Winterwear', items: ['Jackets', 'Sweatshirts', 'Sweaters', 'Capes, Shrug & Ponchos', 'Coats', 'Blazers & Waistcoats'] },
        { title: 'Plus Size', items: ['Plus Size - Dresses & Gowns', 'Plus Size - Tops & Tees', 'Plus size - Bottomwear'] }
      ]
    },
    {
      name: 'Lingerie',
      columns: [
        {
          title: 'Innerwear',
          items: [
            'Women Bra',
            'Women Panties',
            'Other Innerwear'
          ]
        },
        {
          title: 'Sleepwear',
          items: [
            'Women Nightsuits',
            'Women Nightdress',
            'Other Sleepwear'
          ]
        },
        {
          title: 'Sports Wear',
          items: [
            'Sports Bottomwear',
            'Sports Bra',
            'Top & Bottom Sets'
          ]
        },
        {
          title: 'Maternity Wear',
          items: [
            'Kurti & Topwear',
            'Feeding Bras',
            'Briefs & Bottomwear'
          ]
        }
      ]
    },
    {
      name: 'Men',
      columns: [
        { title: 'Top Wear', items: ['Summer T-Shirts', 'Shirts', 'T-Shirts Combos'] },
        { title: 'Bottom Wear', items: ['Jeans', 'Cargos/Trousers', 'Dhotis/Lungis'] },
        { title: 'Ethnic Wear', items: ['Kurtas', 'Kurta Sets', 'Nehru Jacket'] },
        { title: 'Innerwear', items: ['Vests', 'Briefs', 'Boxers'] },
        { title: 'Sports Wear', items: ['Trackpants', 'Tracksuits', 'Gym Tshirts'] },
        { title: 'Night Wear', items: ['Pyjamas', 'Night Shorts', 'Nightsuits'] },
        { title: 'Winter Wear', items: ['Shrugs', 'Jackets', 'Sweatshirts'] },
        { title: 'Combo Store', items: ['Rakhi Specials', 'Shirts Combo', 'Innerwear Combo'] },
        { title: 'Accessories', items: ['All Accessories', 'Watches', 'Wallets', 'Jewellery', 'Sunglasses & Spectacle Frames', 'Belts'] },
        { title: 'Footwear', items: ['Men Footwear', 'Men Casual Shoes', 'Men Sports Shoes', 'Men Flip Flops and Sandals', 'Men Formal Shoes', 'Loafers'] }
      ]
    },
    {
      name: 'Kids & Toys',
      columns: [
        { title: 'Kids Clothing', items: ['Girls', 'Boys', 'Babies', 'Clothing Sets', 'Frocks & Dresses', 'T-Shirt & Polos'] },
        { title: 'Kids Toys', items: ['Toys & Games', 'Summer Picks', 'Best Sellers', 'Baby Gears'] },
        { title: 'Kids Accessories', items: ['Bags & Backpacks', 'Kids Accessories', 'Party Items'] },
        { title: 'Baby Care', items: ['View All', 'Baby Bedding & Accessories', 'Newborn Care', 'Diapers', 'Baby Mosquito nets', 'Baby Dry Sheets'] }
      ]
    },
    {
      name: 'Home & Kitchen',
      columns: [
        { title: 'Home Decor', items: ['View All', 'Covers', 'Key Holders', 'Artificial Plants', 'Pooja Needs', 'Party Supplies', 'Wallpapers & Stickers', 'Showpieces & Idols', 'Clocks & Wall Decor'] },
        { title: 'Kitchen & Appliances', items: ['View All', 'Storage & Organizers', 'Cookware', 'Kitchen Tools', 'Kitchen Appliances', 'Dinnerware', 'Glasses & Barware', 'Kitchen Linen', 'Home Appliances'] },
        { title: 'Home Textiles', items: ['View All', 'Bedsheets', 'Curtains & Accessories', 'Doormats & Carpets', 'Pillow, Cushion & Covers', 'Blankets & Comforters'] },
        { title: 'Home Improvement', items: ['All Home Essentials', 'Bathroom Accessories', 'Cleaning Supplies', 'Gardening', 'Home Tools', 'Insect Protection'] },
        { title: 'Furniture', items: ['Shoe Racks', 'Study Tables', 'Collapsible Wardrobes', 'Wall Shelves', 'Home Temple', 'Hammock Swing'] }
      ]
    },
    {
      name: 'Beauty & Health',
      columns: [
        { title: 'Makeup', items: ['Lipstick', 'Eye Shadow and Liner', 'Face Makeup', 'Makeup Kits & Combos', 'Hair Curlers', 'Nail Makeup', 'Brushes & Accessories', 'Hair Removal', 'Perfumes & More'] },
        { title: 'Personal Care', items: ['View All', 'Body Lotion', 'Hair Oil & Shampoo', 'Whitening Creams', 'Straighteners & Dryers', 'Face Oil & Serum', 'Face Wash', 'Face Masks & Peels', 'Soaps & Scrubs'] },
        { title: 'Healthcare', items: ['View All', 'Oral Care', 'Winter Healthcare', 'Ear Cleaner', 'Health Monitor & Massagers', 'Foot care', 'Sexual Wellness', 'Ayurveda & Nutrition', 'Sanitary Pads & More'] },
        { title: 'Baby & Mom', items: ['View All', 'Baby Care Essentials', 'Mom Care'] },
        { title: 'Mens Care', items: ['Trimmers', 'Beard Oil', 'Men Perfumes & Deodorant', 'Hair Gels, Wax & Spray', 'Men\'s Face & Body Care', 'Budget Grooming Kits'] }
      ]
    },
    {
      name: 'Jewellery & Accessories',
      columns: [
        { title: 'Jewellery', items: ['All Jewellery', 'Jewellery Sets', 'Earrings', 'Mangalsutras', 'Necklaces & Chains', 'Bangles & Bracelets', 'Anklets & Nosepins', 'Kamarbandh & Maangtika'] },
        { title: 'Men Accessories', items: ['All Accessories', 'Men Watches', 'Wallets', 'Men Jewellery', 'Sunglasses & Spectacle Frames', 'Belts'] },
        { title: 'Women Accessories', items: ['All Accessories', 'Women Watches', 'Hair Accessories', 'Women Belts', 'Sunglasses & Spectacle Frames', 'Scarves, Stoles & Gloves'] }
      ]
    },
    {
      name: 'Bags & Footwear',
      columns: [
        { title: 'Women Footwear', items: ['View All', 'Heels and Sandals', 'Flats', 'Boots', 'Flipflops & Slippers', 'Bellies and Ballerinas'] },
        { title: 'Men Footwear', items: ['View All', 'Men Casual Shoes', 'Men Sports Shoes', 'Men Flip Flops and Sandals', 'Men Formal Shoes', 'Loafers'] },
        { title: 'Kids Footwear', items: ['View All', 'Boys Shoes', 'Girls Shoes', 'Casual Shoes', 'Flipflops & Slippers', 'Sandals'] },
        { title: 'Women Bags', items: ['View All', 'Backpacks', 'Handbags', 'Slingbags', 'Wallets', 'Clutches'] },
        { title: 'Men Bags', items: ['Backpacks', 'Waist Bags', 'Crossbody Bags & Sling Bags'] },
        { title: 'Travel Bags, Luggage and Accessories', items: ['View All', 'Duffel & Trolley Bags', 'Laptop & Messenger Bags'] }
      ]
    },
    {
      name: 'Electronics',
      columns: [
        {
          title: 'Audio & Mobiles',
          items: ['Neckband', 'Speakers', 'Cases & Covers', 'Bluetooth Earbuds', 'Wired Earphone']
        },
        {
          title: 'Accessories',
          items: [
            'Mobile Holders',
            'Mobile Chargers & Cables',
            'Power Banks',
            'Microphone',
            'Selfie Stick & Ringlight',
            'Tripod & Monopod',
            'Extension Cord',
            'Screen Expanders & Magnifiers',
            'View All'
          ]
        }
      ]
    },
    {
      name: 'Watches',
      columns: [
        {
          title: 'Watches',
          items: [
            'Analog Watches',
            'Digital Watches',
            'Sport Watches',
            'Couple Watch',
            'Bands & Boxes',
            'View All'
          ]
        }
      ]
    },

    {
      name: 'Sports & Fitness',
      columns: [
        {
          title: 'Fitness',
          items: [
            'View All',
            'Sweat Belts',
            'Exercise Bands',
            'Tummy Trimmers',
            'Skipping Ropes',
            'Hand Grip Strengthener',
            'Yoga',
            'Fitness Accessories',
            'Fitness Gears'
          ]
        },
        {
          title: 'Sports',
          items: [
            'Cricket',
            'Cycles & Accessories',
            'Skating',
            'Football',
            'Badminton',
            'Volleyball',
            'Fishing',
            'Swimming',
            'View All'
          ]
        }
      ]
    },
    {
      name: 'Car & Motorbike',
      columns: [
        {
          title: 'Bike & Scooty Accessories',
          items: [
            'Bike LED Lights',
            'Bike Covers',
            'Bike Accessories',
            'Safety Gear & Clothing',
            'Helmets',
            'Scooty & Activa Accessories'
          ]
        },
        {
          title: 'Car Accessories',
          items: [
            'Interior Accessories',
            'Car Care & Cleaning',
            'Car Repair Assistance',
            'Car Mobile & Holders',
            'Car Covers',
            'Car Exterior Accessories'
          ]
        }
      ]
    },
    {
      name: 'Office Supplies',
      columns: [
        {
          title: 'Office Supplies & Stationery',
          items: [
            'View All',
            'Pens & Pencils',
            'Diaries & Notebooks',
            'Art & Craft Supplies',
            'Files & Desks Organizers',
            'Adhesives & Tapes'
          ]
        }
      ]
    },
    {
      name: 'Grocery',
      columns: [
        {
          title: 'Food & Drinks',
          items: [
            'Dry Fruits',
            'Masala and spices',
            'Snacks and Namkeens',
            'Pickles',
            'Chocolates & Candies',
            'Biscuit and cookies',
            'Coffee',
            'Tea',
            'View All'
          ]
        }
      ]
    },

    {
      name: 'Books',
      columns: [
        {
          title: 'Fiction & Non Fiction',
          items: [
            'Children\'s Books',
            'Motivational Books',
            'Novels',
            'Religious Books',
            'Economics & Commerce',
            'View All Books'
          ]
        },
        {
          title: 'Academic Books',
          items: [
            'UPSC & Central Exam Preparation',
            'Competitive Exams Preparation',
            'Reference Books',
            'School Textbooks & Guides',
            'University Books & Guides',
            'All Academic Books'
          ]
        }
      ]
    },
    {
      name: 'Pet Supplies',
      columns: [
        {
          title: 'Pet Supplies',
          items: [
            'Collars & Leashes',
            'Clothes & Grooming',
            'Food & Treats',
            'Aquarium Accessories',
            'Pet Toys',
            'Pet Bowls'
          ]
        }
      ]
    },
    {
      name: 'Musical Instruments',
      columns: [
        {
          title: 'Musical Instruments',
          items: [
            'Dholaks & Drum sets',
            'Piano & Keyboard',
            'String Instruments',
            'Wind Instruments',
            'Musical Accessories',
            'All Musical Instruments'
          ]
        }
      ]
    }
  ];


  /* =========================================================
     FILTERED SEARCH SUGGESTIONS
     ========================================================= */

  readonly filteredSuggestions = computed(() => {
    const query = this.searchQuery()
      .toLowerCase()
      .trim();

    if (!query) {
      return this.popularSearches;
    }

    return this.popularSearches.filter(search =>
      search.toLowerCase().includes(query)
    );
  });


  /* =========================================================
     SEARCH DROPDOWN VISIBILITY
     ========================================================= */

  readonly showSuggestions = computed(() =>
    this.searchFocused() &&
    this.filteredSuggestions().length > 0
  );


  /* =========================================================
     SERVICES
     ========================================================= */

  constructor(
    public auth: AuthService,
    public cart: CartService
  ) { }


  /* =========================================================
     SCROLL
     ========================================================= */

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 4);
  }


  /* =========================================================
     DOCUMENT CLICK
     ========================================================= */

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.nav-action--profile')) {
      this.profileOpen.set(false);
    }

    if (!target.closest('.search')) {
      this.searchFocused.set(false);
    }
  }


  /* =========================================================
     PROFILE
     ========================================================= */

  onProfileMouseEnter(): void {
    this.profileOpen.set(true);
  }

  onProfileMouseLeave(): void {
    this.profileOpen.set(false);
  }


  /* =========================================================
     SEARCH
     ========================================================= */

  selectSuggestion(term: string): void {
    this.searchQuery.set(term);
    this.searchFocused.set(false);
  }

  onSearchSubmit(): void {
    if (this.searchQuery().trim()) {
      this.searchFocused.set(false);
    }
  }


  /* =========================================================
     AUTH
     ========================================================= */

  logout(): void {
    this.auth.logout();
    this.profileOpen.set(false);
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.auth.deleteAccount();
      this.profileOpen.set(false);
    }
  }
}