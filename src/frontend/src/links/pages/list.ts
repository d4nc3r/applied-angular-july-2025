import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LinksStore } from '../services/links-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-links-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @if (store.entities()) {
      <form class="filter">
        <input
          (click)="store.clearFilterTag()"
          class="btn btn-square"
          type="reset"
          value="×"
        />
        @for (tag of store.tags(); track tag) {
          <input
            class="btn"
            type="radio"
            name="filter"
            [checked]="store.filterTag() === tag"
            [attr.aria-label]="tag"
            (click)="store.setFilterTag(tag)"
          />
        }
      </form>
      <ul class="list rounded-box bg-base-300 p-4">
        @for (link of store.filteredLinks(); track link.id) {
          <li class="list-row mb-2">
            <div>
              <p class="text-md font-bold">{{ link.title }}</p>
              <a class="link" [href]="link.url" target="_blank">{{
                link.url
              }}</a>
            </div>
            <div>
              @if (link.isOwnedByCurrentUser) {
                <a
                  [routerLink]="[link.id, 'edit']"
                  class="btn btn-sm btn-secondary"
                  >Edit</a
                >
              }
            </div>
            <div>
              @for (tag of link.tags; track tag) {
                <button
                  (click)="store.setFilterTag(tag)"
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
  store = inject(LinksStore);

  // resource is only intended for "read" operations, and is still experimental
  // linksResource = resource<ApiLink[], unknown>({
  //   loader: () =>
  //     fetch('https://links-api.fictionalcompany.com/api/links').then((r) =>
  //       r.json(),
  //     ),
  // });
}
