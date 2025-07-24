import { effect, inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { NavBarUserPrefsActions } from '../../shared/nav-bar/actions/link-user-prefs';

type UserPrefsState = {
  watchedTags: string[];
  ignoredTags: string[];
};

export function withUserPrefs() {
  return signalStoreFeature(
    withState<UserPrefsState>({
      watchedTags: [],
      ignoredTags: [],
    }),
    withMethods((state) => {
      const reduxStore = inject(Store);
      return {
        addToWatched: (tag: string) => {
          patchState(state, {
            watchedTags: [...state.watchedTags(), tag],
            ignoredTags: state.ignoredTags().filter((t) => t !== tag),
          });
        },
        removeFromWatched: (tag: string) => {
          patchState(state, {
            watchedTags: state.watchedTags().filter((t) => t !== tag),
          });
        },
        addToIgnored: (tag: string) => {
          patchState(state, {
            ignoredTags: [...state.ignoredTags(), tag],
            watchedTags: state.watchedTags().filter((t) => t !== tag),
          });
        },
        removeFromIgnored: (tag: string) => {
          patchState(state, {
            ignoredTags: state.ignoredTags().filter((t) => t !== tag),
          });
        },
        _updateNavbar: () => {
          reduxStore.dispatch(
            NavBarUserPrefsActions.tagPrefsChanged({
              payload: {
                ignoredTagsCount: state.ignoredTags().length,
                watchedTagsCount: state.watchedTags().length,
              },
            }),
          );
        },
      };
    }),
    withHooks({
      onInit(store) {
        effect(() => {
          console.log('user prefs changed, tell the navbar');
          store._updateNavbar();
        });
      },
    }),
  );
}
