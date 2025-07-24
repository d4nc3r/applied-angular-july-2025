import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { IdentityActions } from './actions';

export type IdentityState = {
  sub: string | null;
  roles: string[];
};

const initialState: IdentityState = {
  sub: 'b398939',
  roles: [],
};

export const identityFeature = createFeature({
  name: 'identity',
  reducer: createReducer(
    initialState,
    on(IdentityActions.loginSucceeded, (state, { payload }) => payload),
    on(IdentityActions.logoutRequested, () => initialState),
  ),
  // add extra, not-for-free, selectors
  extraSelectors: ({ selectSub }) => ({
    selectIsLoggedIn: createSelector(selectSub, (s) => s !== null),
  }),
});

// these selectors come for free b/c we used createFeature
export const { selectSub, selectRoles, selectIsLoggedIn } = identityFeature;
