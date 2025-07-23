import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { ApiLink } from '../types';
import { LinkApiService } from './links-api';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import {
  setIsFullfilled,
  setIsLoading,
  withApiState,
} from './api-state-feature';

type SortOptions = 'newest' | 'oldest';
type LinksState = {
  sortOrder: SortOptions;
  filterTag: string | null;
};

export const LinksStore = signalStore(
  withDevtools('links-store'),
  withApiState(),
  withEntities<ApiLink>(),
  withState<LinksState>({
    sortOrder: 'newest', // this is going to be readonly
    filterTag: null,
  }),
  withMethods((state) => {
    const service = inject(LinkApiService);
    // work goes here
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(state, setIsLoading())),
          exhaustMap(() =>
            service
              .getLinks()
              .pipe(
                tap((r) =>
                  patchState(state, setEntities(r), setIsFullfilled()),
                ),
              ),
          ),
        ),
      ),
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder }),
      setFilterTag: (filterTag: string) => patchState(state, { filterTag }),
      clearFilterTag: () => patchState(state, { filterTag: null }),
    };
  }),
  withComputed((state) => {
    return {
      tags: computed(() => {
        const links = state.entities() || [];
        const allTags = links.reduce((prev: string[], curr) => {
          return [...prev, ...curr.tags];
        }, []);
        return Array.from(new Set(allTags));
      }),
      filteredLinks: computed(() => {
        const tag = state.filterTag();
        if (tag === null) return state.entities() || [];
        return (state.entities() || []).filter((link) =>
          link.tags.includes(tag),
        );
      }),
    };
  }),
  withHooks({
    onInit: (store) => {
      store._load();
      console.log('created links store');
    },
    onDestroy: () => console.log('destroyed links store'),
  }),
);
