import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Tamjid Hossain — MA Sociology | Freie Universität Berlin',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 — Page Not Found',
  },
];
