import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-demos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Demos</h1>
    <div class="flex flex-row gap-4">
      <a routerLink="signals" class="btn btn-primary">Signals</a>
    </div>
    <section>
      <router-outlet />
    </section>
  `,
  styles: ``,
})
export class Demos {}
