import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface MetaConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  lang?: string;
}

@Injectable({ providedIn: 'root' })
export class MetaService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  private readonly defaults: MetaConfig = {
    title: 'Tamzid Hossain — Assistant Manager | Berlin',
    description: 'Operations & Retail Management professional with an MA in Sociology from FU Berlin. Experienced in team leadership, SAP, and inventory management. Berlin-based, open to work.',
    keywords: 'Tamzid Hossain, Assistant Manager, Operations Management, Retail, SAP, Inventory, Berlin, MA Sociology',
    image: '/images/og-image.jpg',
    url: 'https://tamzid-hossain.de',
    type: 'website',
  };

  setPage(config: Partial<MetaConfig>): void {
    const merged = { ...this.defaults, ...config };
    const fullTitle = config.title
      ? `${config.title} | Tamzid Hossain`
      : this.defaults.title!;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: merged.description! });
    this.meta.updateTag({ name: 'keywords', content: merged.keywords! });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: merged.description! });
    this.meta.updateTag({ property: 'og:image', content: merged.image! });
    this.meta.updateTag({ property: 'og:url', content: merged.url! });
    this.meta.updateTag({ property: 'og:type', content: merged.type! });
    this.meta.updateTag({ property: 'og:site_name', content: 'Tamzid Hossain' });

    // Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: merged.description! });
    this.meta.updateTag({ name: 'twitter:image', content: merged.image! });
  }

  setDefault(): void {
    this.setPage({});
  }
}
