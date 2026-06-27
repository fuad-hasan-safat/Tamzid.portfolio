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
    title: 'Tamjid Hossain — MA Sociology | Freie Universität Berlin',
    description: 'Research-driven sociology graduate specialising in migration, integration, policy analysis, diversity & evidence-based decision making. Berlin-based, open to work.',
    keywords: 'sociology, migration, integration, policy analysis, social research, Berlin, Germany, Freie Universität',
    image: '/images/og-image.jpg',
    url: 'https://tamjid-hossain.de',
    type: 'website',
  };

  setPage(config: Partial<MetaConfig>): void {
    const merged = { ...this.defaults, ...config };
    const fullTitle = config.title
      ? `${config.title} | Tamjid Hossain`
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
    this.meta.updateTag({ property: 'og:site_name', content: 'Tamjid Hossain' });

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
