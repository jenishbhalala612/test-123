import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes cannot be prerendered without getPrerenderParams
  { path: 'product/:id', renderMode: RenderMode.Server },

  // All other routes can be prerendered
  { path: '**', renderMode: RenderMode.Prerender }
];
