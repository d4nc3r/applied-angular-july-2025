import {
  Component,
  ChangeDetectionStrategy,
  input,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-links-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>edit the link: {{ id() }}</p> `,
  styles: ``,
})
export class Edit {
  id = input.required<string>();

  constructor() {
    effect(() => {
      const id = this.id();
      console.log(`GET /links/${id}`);
      // store.setSelectedId(id);
    });
  }
}
