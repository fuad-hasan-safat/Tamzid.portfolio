import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio-theme';

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        const html = document.documentElement;
        if (t === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
        localStorage.setItem(this.storageKey, t);
      }
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  isDark = () => this.theme() === 'dark';

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) return 'light';
    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
