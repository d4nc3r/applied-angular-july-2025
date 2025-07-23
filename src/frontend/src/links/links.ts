import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinksStore } from './services/links-store';
import { LinkApiService } from './services/links-api';

@Component({
  selector: 'app-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [LinksStore, LinkApiService], // provide to ME and any of my CHILDREN, but is not global
  template: `
    <div class="flex flex-row gap-4">
      <a class="link" routerLink="/list">List</a>
      <a class="link" routerLink="prefs">prefs</a>
    </div>

    <div class="p-4">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Links {}
