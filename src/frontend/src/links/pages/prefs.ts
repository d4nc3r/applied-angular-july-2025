import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LinksStore } from '../services/links-store';
import { UserTagFilter } from '../components/user-tag-filter';

@Component({
  selector: 'app-links-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserTagFilter],
  template: `
    <h1>Link Sorting Preferences</h1>
    <div class="join">
      <button
        [disabled]="store.sortOrder() === 'newest'"
        (click)="store.changeSortOrder('newest')"
        class="btn join-item"
      >
        Newest at top
      </button>
      <button
        [disabled]="store.sortOrder() === 'oldest'"
        (click)="store.changeSortOrder('oldest')"
        class="btn join-item"
      >
        Oldest at top
      </button>
    </div>
    <app-links-user-tag-filter />
  `,
  styles: ``,
})
export class Prefs {
  store = inject(LinksStore);
}
