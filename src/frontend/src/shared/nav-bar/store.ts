import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { NavBarUserPrefsActions } from './actions/link-user-prefs';

export type TagPrefsState = {
  watchedTagsCount: number;
  ignoredTagsCount: number;
};

type NavBarState = {} & TagPrefsState;

const initialState: NavBarState = {
  watchedTagsCount: 0,
  ignoredTagsCount: 0,
};

export const navBarFeature = createFeature({
  name: 'app nav-bar',
  reducer: createReducer(
    initialState,
    on(NavBarUserPrefsActions.tagPrefsChanged, (state, { payload }) => ({
      ...state,
      ...payload,
    })),
  ),
  extraSelectors: ({ selectWatchedTagsCount, selectIgnoredTagsCount }) => ({
    selectLinksNavbar: createSelector(
      selectWatchedTagsCount,
      selectIgnoredTagsCount,
      (watchedTagCount, ignoredTagsCount) => ({
        watchedTagCount,
        ignoredTagsCount,
      }),
    ),
  }),
});

export const {
  selectWatchedTagsCount,
  selectIgnoredTagsCount,
  selectLinksNavbar,
} = navBarFeature;
