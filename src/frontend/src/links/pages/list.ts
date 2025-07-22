import {
  Component,
  ChangeDetectionStrategy,
  resource,
  signal,
  computed,
  inject,
} from '@angular/core';
import { ApiLink } from '../types';
import { LinksStore } from '../services/links-store';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (linksResource.hasValue()) {
      <form class="filter">
        <input
          (click)="filterTag.set(null)"
          class="btn btn-square"
          type="reset"
          value="×"
        />
        @for (tag of tags(); track tag) {
          <input
            class="btn"
            type="radio"
            name="filter"
            [checked]="filterTag() === tag"
            [attr.aria-label]="tag"
            (click)="filterTag.set(tag)"
          />
        }
      </form>
      <ul class="list rounded-box bg-base-300 p-4">
        @for (link of filteredLinks(); track link.id) {
          <li class="list-row mb-2">
            <div>
              <p class="text-md font-bold">{{ link.title }}</p>
              <a class="link" [href]="link.url" target="_blank">{{
                link.url
              }}</a>
            </div>
            <div></div>
            <div>
              @for (tag of link.tags; track tag) {
                <button
                  (click)="filterTag.set(tag)"
                  class="badge badge-primary mr-2"
                >
                  {{ tag }}
                </button>
              }
            </div>
          </li>
        }
      </ul>
    }
  `,
  styles: ``,
})
export class List {
  filterTag = signal<string | null>(null);

  store = inject(LinksStore);

  filteredLinks = computed(() => {
    const tag = this.filterTag();
    if (tag === null) return this.linksResource.value() || [];
    return (this.linksResource.value() || []).filter((link) =>
      link.tags.includes(tag),
    );
  });

  tags = computed(() => {
    const links = this.linksResource.value() || [];
    const allTags = links.reduce((prev: string[], curr) => {
      return [...prev, ...curr.tags];
    }, []);
    return Array.from(new Set(allTags));
  });

  // resource is only intended for "read" operations, and is still experimental
  linksResource = resource<ApiLink[], unknown>({
    loader: () =>
      fetch('https://links-api.fictionalcompany.com/api/links').then((r) =>
        r.json(),
      ),
  });
}
