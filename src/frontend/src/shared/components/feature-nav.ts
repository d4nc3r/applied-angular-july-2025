import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

export type FeatureNavLink = {
  href: string[];
  label: string;
};

@Component({
  selector: 'app-feature-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="navbar bg-base-300 shadow-sm my-8">
      <ul class="menu menu-horizontal px-1">
        @for (link of links(); track $index) {
          <li>
            <a [routerLink]="link.href" routerLinkActive="underline">{{
              link.label
            }}</a>
          </li>
        }
      </ul>
      <ng-content></ng-content>
      <div><router-outlet /></div>
    </div>
  `,
  styles: ``,
})
export class FeatureNav {
  links = input.required<FeatureNavLink[]>();
  sectionName = input.required<string>();
}
