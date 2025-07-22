import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterStore } from './services/counter-store';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [CounterStore],
  template: `
    <div class="flex gap-4">
      <a class="link" routerLink="ui">UI</a>
      <a class="link" routerLink="prefs">Prefs</a>
    </div>
    <div class="p-4">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Counter {}
