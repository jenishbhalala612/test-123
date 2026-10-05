import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsForYouCardsContent } from '../products-for-you-cards-content/products-for-you-cards-content';
import { ProductService } from '../../core/services/product.service';

interface FilterCategory {
  name: string;
  isOpen: boolean;
  type?: 'search' | 'pills' | 'checkbox';
  searchTerm?: string;
  options: string[];
  hasShowMore?: boolean;
  showAll?: boolean; // Added to fix Property 'showAll' does not exist error
}

@Component({
  selector: 'app-products-for-you',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsForYouCardsContent],
  templateUrl: './products-for-you.html',
  styleUrl: './products-for-you.scss',
})
export class ProductsForYou {
  private readonly productService = inject(ProductService);

  isDropdownOpen: boolean = false;
  selectedSort: string = 'Relevance';
  sortOptions: string[] = [
    'Relevance',
    'New Arrivals',
    'Price (High to Low)',
    'Price (Low to High)',
    'Ratings',
    'Discount'
  ];

  // Added missing options properties for the bottom/modal sections of HTML template
  categoryOptions: string[] = [
    "Women T-shirts", "Women Tops And Tunics", "Analog Watches", "Appliance Covers",
    "Bangles & Bracelets", "Bedsheets", "Blouses", "Caps & Hats", "Dresses"
  ];

  genderOptions: { name: string; img: string }[] = [
    { name: 'Women', img: 'assets/images/women.png' },
    { name: 'Men', img: 'assets/images/men.png' },
    { name: 'Boys', img: 'assets/images/boys.png' },
    { name: 'Girls', img: 'assets/images/girls.png' }
  ];

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string): void {
    this.selectedSort = option;
    this.isDropdownOpen = false;
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(category?: string): void {
    let sortParam = 'relevance';
    if (this.selectedSort.includes('Low to High')) sortParam = 'price_asc';
    else if (this.selectedSort.includes('High to Low')) sortParam = 'price_desc';
    else if (this.selectedSort.includes('Rating')) sortParam = 'rating_desc';
    else if (this.selectedSort.includes('Discount')) sortParam = 'discount_desc';
    else if (this.selectedSort.includes('New')) sortParam = 'new_arrivals';

    this.productService.getProducts({
      sort: sortParam,
      category,
      limit: 48
    }).subscribe();
  }

  activePopup: string | null = null;
  popupTitle: string = '';
  isClosing: boolean = false;
  selectedFilterTab: string = 'Category';

  filterCategories: FilterCategory[] = [
    {
      name: "Category",
      isOpen: true,
      type: "search",
      searchTerm: "",
      options: [
        "Women T-shirts", "Women Tops And Tunics", "Analog Watches", "Appliance Covers",
        "Bangles & Bracelets", "Bedsheets", "Blouses", "Caps & Hats", "Dresses",
        "Dresses", "Earrings & Studs", "Face Gels", "Fridge Covers", "Hair Oil",
        "Hair Oils", "Jackets And Coats", "Jeans", "Jewellery Set", "Kids - Boys Tshirts & Polos",
        "Kids - Frocks & Dresses", "Kids - Girls Frocks & Dresses", "Kids Toys", "Kitchen Storage",
        "Kitchen Tools", "Kurta Sets", "Kurtis", "Leggings & Tights", "Mangalsutras",
        "Men Analog Watches", "Men Shirts", "Men T-shirts", "Mobile Cases & Covers",
        "Sarees", "Shapewear", "Shirts", "Shoes", "Shorts", "Socks", "Stickers",
        "Suits & Dress Materials", "Sweater And Sweatshirts", "T-shirts"
      ],
      hasShowMore: true,
      showAll: false
    },
    {
      name: 'Gender',
      isOpen: false,
      type: 'pills',
      options: ['Boys', 'Girls', 'Men', 'Women']
    },
    {
      name: 'Color',
      isOpen: false,
      options: ['Black', 'Blue', 'White', 'Red', 'Pink', 'Green', 'Yellow', 'Purple']
    },
    {
      name: 'Fabric',
      isOpen: false,
      options: ['Art Silk', 'Banarasi Silk', 'Chiffon', 'Cotton', 'Cotton Blend', 'Georgette']
    },
    {
      name: 'Size',
      isOpen: false,
      options: [
        "0-2 Years", "1.5 meters", "1.75 meters", "10", "10-16 Years",
        "2 meters", "2-5 Years", "2.2 meters", "2.4", "2.5 meters",
        'S', 'M', 'L', 'XL', 'XXL', 'Free Size'
      ]
    },
    {
      name: 'Price',
      isOpen: false,
      options: ['Under ₹200', '₹200 - ₹500', '₹500 - ₹1000', 'Above ₹1000']
    },
    {
      name: 'Rating',
      isOpen: false,
      options: ['4.0 and above', '3.5 and above', '3.0 and above']
    },
    {
      name: 'Occassion',
      isOpen: false,
      options: ['Festive']
    },
    {
      name: 'Combo',
      isOpen: false,
      options: ['Combos', 'Multipacks']
    },
    {
      name: 'Discount',
      isOpen: false,
      options: ['10% and Above', '20% and Above', '30% and Above']
    },
    {
      name: 'Meesho Gold',
      isOpen: false,
      options: ['Premium Products']
    },
    {
      name: "Meesho Mall",
      isOpen: false,
      options: ["Mall Brands"]
    },
    {
      name: "Fit/ Shape",
      isOpen: false,
      options: ["A-line", "Anarkali", "Flared", "Tummy"]
    },
    {
      name: "Material",
      isOpen: false,
      options: ["Ceramic", "Clay", "Denim", "Leather", "Mesh", "Plastic", "Silicone", "Steel", "Vinyl"]
    },
    {
      name: "Bottom Length",
      isOpen: false,
      options: ["2 mtrs"]
    },
    {
      name: "Print Or Pattern Type",
      isOpen: false,
      options: ["Knitted"]
    },
    {
      name: "Ornamentation",
      isOpen: false,
      options: ["Lace border", "Tassels"]
    },
    {
      name: "Bottom Pattern Type",
      isOpen: false,
      options: ["Printed"]
    },
    {
      name: "Surface Styling",
      isOpen: false,
      options: ["Bow", "Ruffles", "Tie-Ups"]
    },
    {
      name: "Back Type",
      isOpen: false,
      options: ["Round Neck"]
    },
    {
      name: "Loom Type",
      isOpen: false,
      options: ["Powerloom"]
    },
    {
      name: "Compatible Models",
      isOpen: false,
      options: ["Others"]
    },
    {
      name: "Warranty Period",
      isOpen: false,
      options: ["6 Months"]
    },
    {
      name: "Waist Rise",
      isOpen: false,
      options: ["Waist Rise"]
    },
    {
      name: "Bottom Type",
      isOpen: false,
      options: ["Palazzos", "Shorts"]
    },
    {
      name: "Dial Design",
      isOpen: false,
      options: ["Solid", "Square"]
    },
    {
      name: "Type",
      isOpen: false,
      options: [
        "Cream", "Flat Sheets", "Gel", "Gujrati", "Jaipuri Designs",
        "Kashmiri", "Kota Doria", "Liquid", "Lucknowi", "Macrame", "Punjabi/All Over Suits"
      ]
    },
    {
      name: "Type of Skin",
      isOpen: false,
      options: ["All Skin Types"]
    },
    {
      name: "Type of Hair",
      isOpen: false,
      options: ["All Hair Type"]
    },
    {
      name: "Flavour",
      isOpen: false,
      options: ["Ginger", "Onion"]
    }
  ];

  toggleFilter(filter: any): void {
    filter.isOpen = !filter.isOpen;
  }

  // Added missing toggleShowMore method for accordion items
  toggleShowMore(filter: any): void {
    filter.showAll = !filter.showAll;
  }

  openPopup(type: string): void {
    this.activePopup = type;
    this.popupTitle = type === 'filters' ? 'FILTERS' : type.toUpperCase();
    this.isClosing = false;
    if (type === 'filters') {
      this.selectedFilterTab = 'Category';
    }
  }

  closePopup(): void {
    this.isClosing = true;
    setTimeout(() => {
      this.activePopup = null;
      this.isClosing = false;
    }, 300);
  }

  getOptionsForTab(tabName: string): string[] {
    const found = this.filterCategories.filter(f => f.name === tabName)[0];
    return found ? found.options : [];
  }
}