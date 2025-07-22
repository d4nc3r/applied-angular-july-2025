import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <h1>Home Page</h1> `,
  styles: ``,
})
export class Home {}
