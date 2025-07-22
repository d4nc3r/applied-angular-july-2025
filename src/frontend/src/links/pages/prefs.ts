import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { LinksStore } from '../services/links-store';

@Component({
  selector: 'app-links-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
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
  `,
  styles: ``,
})
export class Prefs {
  store = inject(LinksStore);
}
