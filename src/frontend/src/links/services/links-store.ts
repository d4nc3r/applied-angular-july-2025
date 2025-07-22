import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type SortOptions = 'newest' | 'oldest';
type LinksState = {
  sortOrder: SortOptions;
};

export const LinksStore = signalStore(
  withState<LinksState>({
    sortOrder: 'newest', // this is going to be readonly
  }),
  withMethods((state) => {
    // work goes here
    return {
      changeSortOrder: (sortOrder: SortOptions) =>
        patchState(state, { sortOrder }),
    };
  }),
  withHooks({
    onInit: () => console.log('created links store'),
    onDestroy: () => console.log('destroyed links store'),
  }),
);
