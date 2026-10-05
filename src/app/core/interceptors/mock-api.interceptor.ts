import { HttpInterceptorFn, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

// In-memory cache for fast O(1) lookups after initial load
let cachedProducts: any[] | null = null;
let cachedProductDetails: Record<string, any> | null = null;
let cachedCategories: any[] | null = null;
let cachedPincodes: Record<string, any> | null = null;

// Helper to fetch or read local static JSON files
async function loadDataset(file: string, isBrowser: boolean): Promise<any> {
  if (isBrowser) {
    const res = await fetch(`/assets/mock-api/${file}`);
    return await res.json();
  } else {
    try {
      const fs = await import('node:fs');
      const path = await import('node:path');
      const candidates = [
        path.resolve(process.cwd(), 'src/assets/mock-api', file),
        path.resolve(process.cwd(), 'dist/meesho/browser/assets/mock-api', file),
        path.resolve(process.cwd(), 'public/assets/mock-api', file)
      ];
      for (const p of candidates) {
        if (fs.existsSync(p)) {
          return JSON.parse(fs.readFileSync(p, 'utf-8'));
        }
      }
    } catch {
      // Fallback in case of server sandbox restrictions
    }
    return null;
  }
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Pass non-mock-api requests straight through
  if (!req.url.includes('/api/')) {
    return next(req);
  }

  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  // 1. GET /api/categories
  if (req.method === 'GET' && req.url.includes('/api/categories')) {
    return from(
      (async () => {
        if (!cachedCategories) {
          cachedCategories = await loadDataset('categories.json', isBrowser);
        }
        return new HttpResponse({ status: 200, body: cachedCategories ?? [] });
      })()
    );
  }

  // 2. GET /api/pincodes/:code
  const pincodeMatch = req.url.match(/\/api\/pincodes\/([0-9a-zA-Z]+)/);
  if (req.method === 'GET' && pincodeMatch) {
    const code = pincodeMatch[1];
    return from(
      (async () => {
        if (!cachedPincodes) {
          cachedPincodes = await loadDataset('pincodes.json', isBrowser);
        }
        const pinData = cachedPincodes?.[code] ?? {
          pincode: code,
          city: 'Standard Delivery',
          state: 'India',
          deliveryDays: 3,
          cashOnDelivery: true,
          dispatchDays: '1 day'
        };
        return new HttpResponse({ status: 200, body: pinData });
      })()
    );
  }

  // 3. GET /api/products/:id/reviews
  const reviewsMatch = req.url.match(/\/api\/products\/([^\/\?]+)\/reviews/);
  if (req.method === 'GET' && reviewsMatch) {
    const id = reviewsMatch[1];
    return from(
      (async () => {
        if (!cachedProductDetails) {
          cachedProductDetails = await loadDataset('product-details.json', isBrowser);
        }
        const prod = cachedProductDetails?.[id] ?? Object.values(cachedProductDetails || {})[0];
        const reviews = prod?.reviews ?? [];
        return new HttpResponse({ status: 200, body: reviews });
      })()
    );
  }

  // 4. GET /api/products/:id (Single Product Details)
  const productDetailMatch = req.url.match(/\/api\/products\/([^\/\?]+)$/);
  if (req.method === 'GET' && productDetailMatch) {
    const id = productDetailMatch[1];
    return from(
      (async () => {
        if (!cachedProductDetails) {
          cachedProductDetails = await loadDataset('product-details.json', isBrowser);
        }
        let prod = cachedProductDetails?.[id];
        // If not found by direct key, fallback to default product or first entry
        if (!prod && cachedProductDetails) {
          prod = cachedProductDetails['p2130'] || Object.values(cachedProductDetails)[0];
        }
        return new HttpResponse({ status: 200, body: prod ?? null });
      })()
    );
  }

  // 5. GET /api/products (Product Catalog with Query Filters & Sort)
  if (req.method === 'GET' && req.url.includes('/api/products')) {
    const urlObj = new URL(req.url, 'http://localhost');
    const category = urlObj.searchParams.get('category');
    const gender = urlObj.searchParams.get('gender');
    const q = urlObj.searchParams.get('q');
    const sort = urlObj.searchParams.get('sort');
    const page = urlObj.searchParams.get('page');
    const limit = urlObj.searchParams.get('limit');

    return from(
      (async () => {
        if (!cachedProducts) {
          cachedProducts = await loadDataset('products.json', isBrowser);
        }

        let list: any[] = Array.isArray(cachedProducts) ? [...cachedProducts] : [];

        // Category filter with slug mapping from FRONTEND_AGENT_INSTRUCTIONS.md
        if (category && category !== 'all') {
          const cat = category.toLowerCase();
          list = list.filter((p) => {
            if (p.category === cat) return true;
            if (cat === 'women' && (p.category === 'womens-saree' || p.category === "women's saree" || p.gender === 'women')) return true;
            if (cat === 'men' && (p.category === 'mens-tshirt' || p.category === 'mens-jacket' || p.category === "men's jacket" || p.gender === 'men')) return true;
            if (cat === 'electronics' && (p.category === 'electronic' || p.category === 'electronics')) return true;
            if (cat === 'beauty' && (p.category === 'makeup' || p.category === 'beauty')) return true;
            if (cat === 'footwear' && (p.category === 'footware' || p.category === 'footwear')) return true;
            if (cat === 'home' && (p.category === 'home-decor' || p.category === 'home')) return true;
            if (cat === 'jewellery' && (p.category === 'jewellery' || p.category === 'jewelry')) return true;
            if (cat === 'accessories' && p.category === 'accessories') return true;
            if (cat === 'toys' && (p.category === 'toys-games' || p.category === 'toys & games' || p.gender === 'kids')) return true;
            return false;
          });
        }

        // Gender filter
        if (gender && gender !== 'all') {
          const gen = gender.toLowerCase();
          list = list.filter((p) => p.gender && p.gender.toLowerCase() === gen);
        }

        // Search query filter
        if (q) {
          const query = q.toLowerCase().trim();
          list = list.filter((p) => {
            return (
              (p.title && p.title.toLowerCase().includes(query)) ||
              (p.category && p.category.toLowerCase().includes(query)) ||
              (p.categoryLabel && p.categoryLabel.toLowerCase().includes(query)) ||
              (p.tags && Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase().includes(query)))
            );
          });
        }

        // Sorting
        if (sort === 'price_asc' || sort === 'price_low_to_high') {
          list.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_desc' || sort === 'price_high_to_low') {
          list.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating_desc' || sort === 'rating_high_to_low') {
          list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sort === 'discount_desc') {
          list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        }

        // Pagination
        if (limit) {
          const pageNum = Math.max(1, parseInt(page || '1', 10));
          const pageSize = Math.max(1, parseInt(limit, 10));
          const start = (pageNum - 1) * pageSize;
          list = list.slice(start, start + pageSize);
        }

        return new HttpResponse({ status: 200, body: list });
      })()
    );
  }

  return next(req);
};
