import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.count() === 0"
        (click)="store.decrementCount()"
        class="btn btn-primary"
      >
        -
      </button>
      <span>{{ store.count() }}</span>
      <button (click)="store.incrementCount()" class="btn btn-primary">
        +
      </button>
      <div class="">{{ store.fizzBuzz() }}</div>
    </div>
  `,
  styles: ``,
})
export class Ui {
  store = inject(CounterStore);
}
