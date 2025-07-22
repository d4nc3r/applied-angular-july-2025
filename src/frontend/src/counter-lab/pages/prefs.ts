import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @for (option of countOptions; track option) {
      <button
        [disabled]="option === store.countBy()"
        (click)="store.updateCountBy(option)"
        class="btn join-item"
      >
        {{ option }}
      </button>
    }
  `,
  styles: ``,
})
export class Prefs {
  countOptions = [1, 3, 5];
  store = inject(CounterStore);
}
