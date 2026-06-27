import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  LucideMail, LucidePhone, LucideMapPin, LucideLink2,
  LucideExternalLink, LucideCircleCheckBig, LucideCircleAlert, LucideSend
} from '@lucide/angular';
import { PROFILE } from '../../config/profile.data';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule, TranslocoPipe,
    LucideMail, LucidePhone, LucideMapPin, LucideLink2,
    LucideExternalLink, LucideCircleCheckBig, LucideCircleAlert, LucideSend
  ],
  styles: [`
    .form-input {
      padding: 0.625rem 0.875rem;
      border-radius: 0.5rem;
      border: 1.5px solid #E2E8F0;
      font-size: 0.9375rem;
      color: #0F172A;
      background-color: #FFFFFF;
      width: 100%;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      outline: none;
      font-family: inherit;
    }
    .form-input:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
    :host-context(.dark) .form-input { background-color: #0F172A; border-color: #1E293B; color: #F1F5F9; }
    :host-context(.dark) .form-input:focus { border-color: #3B82F6; }
    .form-input.error { border-color: #F87171; }
  `],
  template: `
    <section id="contact" class="section-py bg-white dark:bg-slate-950" aria-labelledby="contact-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-14 fade-up">
          <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-3">
            {{ 'contact.subtitle' | transloco }}
          </p>
          <h2 id="contact-heading" class="font-heading font-bold text-4xl sm:text-5xl text-slate-900 dark:text-slate-100 tracking-tight">
            {{ 'contact.title' | transloco }}
          </h2>
          <div class="mt-4 w-12 h-0.5 bg-blue-600"></div>
        </div>

        <div class="grid lg:grid-cols-5 gap-12 lg:gap-16">

          <!-- Contact info -->
          <aside class="lg:col-span-2 fade-up">
            <div class="card p-6 mb-6">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 mb-5">
                <span class="w-2 h-2 rounded-full bg-green-500" aria-hidden="true"></span>
                <span class="text-[13px] font-medium text-green-700 dark:text-green-400">{{ 'contact.availability' | transloco }}</span>
              </div>
              <dl class="space-y-4">
                <div class="flex items-start gap-3">
                  <dt class="flex-shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <svg lucideMail [size]="15" class="text-blue-600" [strokeWidth]="2" aria-hidden="true"></svg>
                  </dt>
                  <dd>
                    <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Email</p>
                    <a [href]="'mailto:' + profile.email" class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">{{ profile.email }}</a>
                  </dd>
                </div>
                <div class="flex items-start gap-3">
                  <dt class="flex-shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <svg lucidePhone [size]="15" class="text-blue-600" [strokeWidth]="2" aria-hidden="true"></svg>
                  </dt>
                  <dd>
                    <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Phone</p>
                    <a [href]="'tel:' + profile.phone" class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">{{ profile.phone }}</a>
                  </dd>
                </div>
                <div class="flex items-start gap-3">
                  <dt class="flex-shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <svg lucideMapPin [size]="15" class="text-blue-600" [strokeWidth]="2" aria-hidden="true"></svg>
                  </dt>
                  <dd>
                    <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Location</p>
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ profile.location }}</p>
                  </dd>
                </div>
                <div class="flex items-start gap-3">
                  <dt class="flex-shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <svg lucideLink2 [size]="15" class="text-blue-600" [strokeWidth]="2" aria-hidden="true"></svg>
                  </dt>
                  <dd>
                    <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">LinkedIn</p>
                    <a [href]="profile.linkedin" target="_blank" rel="noopener noreferrer"
                       class="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                      View Profile
                      <svg lucideExternalLink [size]="11" [strokeWidth]="2" aria-hidden="true"></svg>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div class="card p-6">
              <h3 class="font-heading font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wide">Academic Profiles</h3>
              <div class="space-y-2.5">
                @for (link of academicLinks; track link.label) {
                  <a [href]="link.url" target="_blank" rel="noopener noreferrer"
                     class="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{{ link.label }}</span>
                    <svg lucideExternalLink [size]="13" [strokeWidth]="2" class="text-slate-400 group-hover:text-blue-500 transition-colors" aria-hidden="true"></svg>
                  </a>
                }
              </div>
            </div>
          </aside>

          <!-- Form -->
          <div class="lg:col-span-3 fade-up delay-2">
            @if (status() === 'success') {
              <div class="card p-10 text-center">
                <div class="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mx-auto mb-4">
                  <svg lucideCircleCheckBig [size]="28" class="text-green-600" [strokeWidth]="2" aria-hidden="true"></svg>
                </div>
                <h3 class="font-heading font-semibold text-xl text-slate-900 dark:text-slate-100 mb-2">Message Sent!</h3>
                <p class="text-slate-500 dark:text-slate-400">{{ 'contact.form.success' | transloco }}</p>
                <button (click)="resetForm()" class="btn btn-outline mt-6">Send another message</button>
              </div>
            } @else {
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="card p-6 md:p-8 space-y-5" novalidate>
                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label for="name" class="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {{ 'contact.form.name' | transloco }} <span class="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input id="name" type="text" formControlName="name" autocomplete="name"
                           class="form-input" [class.error]="isInvalid('name')" [attr.aria-invalid]="isInvalid('name')">
                    @if (isInvalid('name')) {
                      <p class="mt-1 text-[11.5px] text-red-500" role="alert">{{ 'contact.form.required' | transloco }}</p>
                    }
                  </div>
                  <div>
                    <label for="email" class="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {{ 'contact.form.email' | transloco }} <span class="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input id="email" type="email" formControlName="email" autocomplete="email"
                           class="form-input" [class.error]="isInvalid('email')" [attr.aria-invalid]="isInvalid('email')">
                    @if (isInvalid('email')) {
                      <p class="mt-1 text-[11.5px] text-red-500" role="alert">
                        {{ form.get('email')?.hasError('required') ? ('contact.form.required' | transloco) : ('contact.form.invalidEmail' | transloco) }}
                      </p>
                    }
                  </div>
                </div>
                <div>
                  <label for="subject" class="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {{ 'contact.form.subject' | transloco }} <span class="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input id="subject" type="text" formControlName="subject"
                         class="form-input" [class.error]="isInvalid('subject')" [attr.aria-invalid]="isInvalid('subject')">
                  @if (isInvalid('subject')) {
                    <p class="mt-1 text-[11.5px] text-red-500" role="alert">{{ 'contact.form.required' | transloco }}</p>
                  }
                </div>
                <div>
                  <label for="message" class="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {{ 'contact.form.message' | transloco }} <span class="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea id="message" formControlName="message" rows="6"
                            class="form-input resize-none" [class.error]="isInvalid('message')" [attr.aria-invalid]="isInvalid('message')"></textarea>
                  @if (isInvalid('message')) {
                    <p class="mt-1 text-[11.5px] text-red-500" role="alert">
                      {{ form.get('message')?.hasError('required') ? ('contact.form.required' | transloco) : ('contact.form.minLength' | transloco) }}
                    </p>
                  }
                </div>
                @if (status() === 'error') {
                  <div class="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200" role="alert">
                    <svg lucideCircleAlert [size]="15" class="text-red-600 flex-shrink-0 mt-0.5" [strokeWidth]="2" aria-hidden="true"></svg>
                    <p class="text-sm text-red-700 dark:text-red-400">{{ 'contact.form.error' | transloco }}</p>
                  </div>
                }
                <button type="submit" class="btn btn-primary w-full justify-center" [disabled]="status() === 'submitting'">
                  @if (status() === 'submitting') {
                    <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"></span>
                    {{ 'contact.form.sending' | transloco }}
                  } @else {
                    <svg lucideSend [size]="16" [strokeWidth]="2" aria-hidden="true"></svg>
                    {{ 'contact.form.send' | transloco }}
                  }
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  readonly profile = PROFILE;
  readonly status  = signal<FormStatus>('idle');

  readonly form = this.fb.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly academicLinks = [
    { label: 'ORCID',          url: PROFILE.orcid         },
    { label: 'ResearchGate',   url: PROFILE.researchGate  },
    { label: 'Google Scholar', url: PROFILE.googleScholar },
  ];

  isInvalid(f: string): boolean {
    const ctrl = this.form.get(f);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.status.set('submitting');
    setTimeout(() => this.status.set('success'), 1500);
  }

  resetForm(): void { this.form.reset(); this.status.set('idle'); }
}
