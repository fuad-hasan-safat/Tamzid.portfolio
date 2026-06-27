import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'en' | 'de';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transloco = inject(TranslocoService);
  private readonly storageKey = 'portfolio-lang';

  readonly lang = signal<Lang>(this.getInitialLang());

  constructor() {
    this.transloco.setActiveLang(this.lang());
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    this.transloco.setActiveLang(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, lang);
      document.documentElement.lang = lang;
    }
  }

  toggle(): void {
    this.setLang(this.lang() === 'en' ? 'de' : 'en');
  }

  private getInitialLang(): Lang {
    if (!isPlatformBrowser(this.platformId)) return 'de';
    const stored = localStorage.getItem(this.storageKey) as Lang | null;
    if (stored === 'en' || stored === 'de') return stored;
    const browser = navigator.language.slice(0, 2);
    return browser === 'de' ? 'de' : 'en';
  }
}
