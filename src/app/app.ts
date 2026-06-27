import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly scrollService = inject(ScrollService);

  ngOnInit(): void {
    // initialise theme (runs effect in constructor)
    this.themeService.theme();
    this.scrollService.init();
  }
}
