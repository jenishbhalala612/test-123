import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';

import { UpperCasePipe } from '@angular/common';


// ==========================================================
// CATEGORY ITEM
// ==========================================================

interface CategoryItem {
  name: string;
  image: string;
}


// ==========================================================
// CATEGORY SECTION
// ==========================================================

interface CategorySection {
  title: string;
  items: CategoryItem[];
}


// ==========================================================
// CATEGORY
// ==========================================================

interface Category {
  id: string;
  name: string;
  icon: string;
  sections: CategorySection[];
}


// ==========================================================
// COMPONENT
// ==========================================================

@Component({
  selector: 'app-categories-data',

  standalone: true,

  imports: [
    UpperCasePipe
  ],

  templateUrl: './categories-data.html',

  styleUrl: './categories-data.scss'
})
export class CategoriesDataComponent implements AfterViewInit {


  // ========================================================
  // INPUT
  // ========================================================

  @Input() isOpen: boolean = false;


  // ========================================================
  // OUTPUT
  // ========================================================

  @Output() closeMenu = new EventEmitter<void>();


  // ========================================================
  // CATEGORY SECTION REFERENCES
  // ========================================================

  @ViewChildren('categorySection')
  categorySections!: QueryList<ElementRef>;


  // ========================================================
  // CATEGORY DATA
  // ========================================================

  categories: Category[] = [

    // ==========================================
    // POPULAR
    // ==========================================

    {
      id: 'popular',
      name: 'Popular',
      icon: '/assets/images/tablet-screen/categories/tabs/popular.webp',

      sections: [

        {
          title: 'Featured On Meesho',

          items: [
            {
              name: 'Top Selling',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'New Arrivals',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Best Sellers',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Trending',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'All Popular',

          items: [
            {
              name: 'Women Fashion',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Men Fashion',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Home & Kitchen',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Beauty',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    },


    // ==========================================
    // KURTI SAREE LEHENGA
    // ==========================================

    {
      id: 'kurti-saree-lehenga',
      name: 'Kurti, Saree & Lehenga',
      icon: 'assets/categories/kurti-saree.png',

      sections: [

        {
          title: 'Sarees',

          items: [
            {
              name: 'Cotton Sarees',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Silk Sarees',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Designer Sarees',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Printed Sarees',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Georgette Sarees',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Chiffon Sarees',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Kurtis',

          items: [
            {
              name: 'Cotton Kurtis',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Anarkali Kurtis',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Straight Kurtis',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Printed Kurtis',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Kurta Sets',

          items: [
            {
              name: 'Cotton Kurta Sets',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Printed Kurta Sets',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Designer Kurta Sets',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Lehengas',

          items: [
            {
              name: 'Bridal Lehenga',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Party Wear Lehenga',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Designer Lehenga',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    },


    // ==========================================
    // WOMEN WESTERN
    // ==========================================

    {
      id: 'women-western',
      name: 'Women Western',
      icon: 'assets/categories/women-western.png',

      sections: [

        {
          title: 'Western Wear',

          items: [
            {
              name: 'Tops',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'T-Shirts',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Dresses',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Jeans',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Trousers',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Skirts',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Footwear',

          items: [
            {
              name: 'Heels',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Flats',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Casual Shoes',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    },


    // ==========================================
    // LINGERIE
    // ==========================================

    {
      id: 'lingerie',
      name: 'Lingerie',
      icon: 'assets/categories/lingerie.png',

      sections: [

        {
          title: 'Lingerie',

          items: [
            {
              name: 'Bras',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Panties',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Bra Sets',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Sports Bra',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Sleepwear',

          items: [
            {
              name: 'Night Suits',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Night Dresses',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    },


    // ==========================================
    // MEN
    // ==========================================

    {
      id: 'men',
      name: 'Men',
      icon: 'assets/categories/men.png',

      sections: [

        {
          title: 'Top Wear',

          items: [
            {
              name: 'T-Shirts',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Shirts',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Kurtas',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Jackets',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Bottom Wear',

          items: [
            {
              name: 'Jeans',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Trousers',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Shorts',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Footwear',

          items: [
            {
              name: 'Casual Shoes',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Sports Shoes',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Sandals',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    },


    // ==========================================
    // KIDS & TOYS
    // ==========================================

    {
      id: 'kids-toys',
      name: 'Kids & Toys',
      icon: 'assets/categories/kids.png',

      sections: [

        {
          title: 'Kids Fashion',

          items: [
            {
              name: 'Girls Dresses',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Boys Clothing',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Kids T-Shirts',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Kids Ethnic Wear',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Toys',

          items: [
            {
              name: 'Soft Toys',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Educational Toys',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Remote Control Toys',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Games',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    },


    // ==========================================
    // HOME & KITCHEN
    // ==========================================

    {
      id: 'home-kitchen',
      name: 'Home & Kitchen',
      icon: 'assets/categories/home-kitchen.png',

      sections: [

        {
          title: 'Home Decor',

          items: [
            {
              name: 'Wall Decor',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Clocks',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Photo Frames',
              image: 'assets/categories/photo-frames.png'
            },
            {
              name: 'Artificial Plants',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Kitchen',

          items: [
            {
              name: 'Kitchen Tools',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Storage Containers',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Cookware',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Water Bottles',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    },


    // ==========================================
    // BEAUTY & HEALTH
    // ==========================================

    {
      id: 'beauty-health',
      name: 'Beauty & Health',
      icon: 'assets/categories/beauty-health.png',

      sections: [

        {
          title: 'Beauty',

          items: [
            {
              name: 'Makeup',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Lipsticks',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Skincare',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Hair Care',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        },

        {
          title: 'Personal Care',

          items: [
            {
              name: 'Bath & Body',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Grooming',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            },
            {
              name: 'Health Care',
              image: '/assets/images/tablet-screen/categories/right-data/sample.webp'
            }
          ]
        }

      ]
    }

  ];


  // ========================================================
  // ACTIVE CATEGORY
  // ========================================================

  selectedCategory: Category = this.categories[0];


  // ========================================================
  // SCROLL LOCK
  // ========================================================

  isCategoryClickScrolling: boolean = false;


  // ========================================================
  // AFTER VIEW INIT
  // ========================================================

  ngAfterViewInit(): void {

    /*
      All category sections are available
      after view initialization.

      Scroll event will automatically
      detect active category.
    */

  }


  // ========================================================
  // LEFT CATEGORY CLICK
  // ========================================================

  selectCategory(category: Category): void {

    // ----------------------------------------------
    // Immediately activate clicked category
    // ----------------------------------------------

    this.selectedCategory = category;


    // ----------------------------------------------
    // Find target category section
    // ----------------------------------------------

    const element = document.getElementById(
      `category-${category.id}`
    );


    if (!element) {
      return;
    }


    // ----------------------------------------------
    // Lock scroll detection
    //
    // Smooth scroll generates multiple scroll
    // events. We don't want those events to
    // change the active category.
    // ----------------------------------------------

    this.isCategoryClickScrolling = true;


    // ----------------------------------------------
    // Smooth scroll to selected category
    // ----------------------------------------------

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });


    // ----------------------------------------------
    // Unlock after smooth scroll
    // ----------------------------------------------

    setTimeout(() => {

      this.selectedCategory = category;

      this.isCategoryClickScrolling = false;

    }, 700);

  }


  // ========================================================
  // RIGHT CONTENT SCROLL
  // ========================================================

  onContentScroll(event: Event): void {

    // ----------------------------------------------
    // Ignore scroll events caused by category click
    // ----------------------------------------------

    if (this.isCategoryClickScrolling) {
      return;
    }


    // ----------------------------------------------
    // Get scroll container
    // ----------------------------------------------

    const container = event.target as HTMLElement;


    const containerRect =
      container.getBoundingClientRect();


    // ----------------------------------------------
    // Find current visible category
    // ----------------------------------------------

    let currentCategory: Category | null = null;


    for (const category of this.categories) {

      const element = document.getElementById(
        `category-${category.id}`
      );


      if (!element) {
        continue;
      }


      const rect =
        element.getBoundingClientRect();


      /*
        Category becomes active when its
        top reaches near the top of
        right content area.
      */

      const distance =
        rect.top - containerRect.top;


      if (distance <= 150) {

        currentCategory = category;

      }

    }


    // ----------------------------------------------
    // Update active category only when necessary
    // ----------------------------------------------

    if (
      currentCategory &&
      currentCategory.id !== this.selectedCategory.id
    ) {

      this.selectedCategory =
        currentCategory;

    }

  }


  // ========================================================
  // CLOSE DRAWER
  // ========================================================

  close(): void {

    this.closeMenu.emit();

  }


  // ========================================================
  // TRACK CATEGORY
  // ========================================================

  trackByCategory(
    index: number,
    category: Category
  ): string {

    return category.id;

  }


  // ========================================================
  // TRACK SECTION
  // ========================================================

  trackBySection(
    index: number,
    section: CategorySection
  ): string {

    return section.title;

  }


  // ========================================================
  // TRACK ITEM
  // ========================================================

  trackByItem(
    index: number,
    item: CategoryItem
  ): string {

    return item.name;

  }

}