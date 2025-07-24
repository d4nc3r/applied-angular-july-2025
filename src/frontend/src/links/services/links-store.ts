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
  setIsFetching,
  setIsFullfilled,
  setIsLoading,
  withApiState,
} from './api-state-feature';
import {
  clearFilteringTag,
  setFilterTag,
  withLinkFiltering,
} from './link-filter-feature';
import { Store } from '@ngrx/store';
import { selectSub } from '../../shared/identity/store';

type SortOptions = 'newest' | 'oldest';
type LinksState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withDevtools('links-store'),
  withApiState(),
  withLinkFiltering(),
  withEntities<ApiLink>(),
  withState<LinksState>({
    sortOrder: 'newest', // this is going to be readonly
  }),
  withMethods((state) => {
    const service = inject(LinkApiService);

    return {
      _load: rxMethod<{ isBackgroundFetch: boolean }>(
        pipe(
          tap((p) =>
            patchState(
              state,
              p.isBackgroundFetch ? setIsFetching() : setIsLoading(),
            ),
          ),
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
      setFilterTag: (tag: string) => patchState(state, setFilterTag(tag)),
      clearFilterTag: () => patchState(state, clearFilteringTag()),
    };
  }),
  withComputed((state) => {
    // injection context
    const reduxStore = inject(Store);
    const userSub = reduxStore.selectSignal(selectSub);
    return {
      tags: computed(() => {
        const links = state.entities() || [];
        const allTags = links.reduce((prev: string[], curr) => {
          return [...prev, ...curr.tags];
        }, []);
        return Array.from(new Set(allTags));
      }),
      availableTags: computed(() => {}),
      filteredLinks: computed(() => {
        const tag = state.filterTag();
        const updatedLinks = state.entities().map((link) => ({
          ...link,
          isOwnedByCurrentUser: userSub() === link.owner,
        }));

        if (tag === null) return updatedLinks;
        return updatedLinks.filter((link) => link.tags.includes(tag));
      }),
    };
  }),
  withHooks({
    onInit: (store) => {
      store._load({ isBackgroundFetch: false });
      console.log('created links store');
      // setInterval(() => {
      //   store._load({ isBackgroundFetch: true });
      // }, 5000);
    },
    onDestroy: () => console.log('destroyed links store'),
  }),
);
