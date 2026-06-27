import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly scrollY = signal(0);
  readonly activeSection = signal('home');

  private sections: string[] = [
    'home', 'about', 'education', 'research', 'experience',
    'projects', 'publications', 'skills', 'languages',
    'certificates', 'volunteering', 'blog', 'contact',
  ];

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.addEventListener('scroll', () => {
      this.scrollY.set(window.scrollY);
      this.updateActiveSection();
    }, { passive: true });

    this.setupIntersectionObserver();
  }

  scrollTo(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const targets = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach(t => observer.observe(t));
  }

  private updateActiveSection(): void {
    const offset = 120;
    for (const id of [...this.sections].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= offset) {
        this.activeSection.set(id);
        return;
      }
    }
    this.activeSection.set('home');
  }
}
