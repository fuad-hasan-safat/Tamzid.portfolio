import { Component, ChangeDetectionStrategy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

import { NavigationComponent } from '../../features/navigation/navigation.component';
import { HeroComponent } from '../../features/hero/hero.component';
import { StatsComponent } from '../../features/stats/stats.component';
import { AboutComponent } from '../../features/about/about.component';
import { EducationComponent } from '../../features/education/education.component';
import { ResearchComponent } from '../../features/research/research.component';
import { ExperienceComponent } from '../../features/experience/experience.component';
import { ProjectsComponent } from '../../features/projects/projects.component';
import { PublicationsComponent } from '../../features/publications/publications.component';
import { SkillsComponent } from '../../features/skills/skills.component';
import { LanguagesSectionComponent } from '../../features/languages-section/languages-section.component';
import { CertificatesComponent } from '../../features/certificates/certificates.component';
import { VolunteeringComponent } from '../../features/volunteering/volunteering.component';
import { TestimonialsComponent } from '../../features/testimonials/testimonials.component';
import { BlogComponent } from '../../features/blog/blog.component';
import { ContactComponent } from '../../features/contact/contact.component';
import { FooterComponent } from '../../features/footer/footer.component';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslocoModule,
    NavigationComponent,
    HeroComponent,
    StatsComponent,
    AboutComponent,
    EducationComponent,
    ResearchComponent,
    ExperienceComponent,
    ProjectsComponent,
    PublicationsComponent,
    SkillsComponent,
    LanguagesSectionComponent,
    CertificatesComponent,
    VolunteeringComponent,
    TestimonialsComponent,
    BlogComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-navigation />

    <main id="main-content" tabindex="-1">
      <app-hero />
      <app-stats />
      <app-about />
      <app-education />
      <app-research />
      <app-experience />
      <app-projects />
      <app-publications />
      <app-skills />
      <app-languages-section />
      <app-certificates />
      <app-volunteering />
      <app-testimonials />
      <app-blog />
      <app-contact />
    </main>

    <app-footer />
  `,
})
export class HomeComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollService = inject(ScrollService);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollService.setupIntersectionObserver();
    }
  }
}
