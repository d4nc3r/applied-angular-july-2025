import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <h1>About Us</h1> `,
  styles: ``,
})
export class About {}
