import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

type CounterState = {
  countBy: number;
  count: number;
};

export const CounterStore = signalStore(
  withState<CounterState>({
    countBy: 1,
    count: 0,
  }),
  withMethods((state) => {
    return {
      updateCountBy: (countBy: number) => patchState(state, { countBy }),
      incrementCount: () =>
        patchState(state, { count: state.count() + state.countBy() }),
      decrementCount: () => {
        const updatedCount = state.count() - state.countBy();
        return patchState(state, {
          count: updatedCount < 0 ? 0 : updatedCount,
        });
      },
    };
  }),
  withComputed(({ count }) => ({
    fizzBuzz: computed(() => {
      if (count() === 0) return '';
      if (count() % 5 === 0 && count() % 3 === 0) return 'FizzBuzz';
      if (count() % 5 === 0) return 'Buzz';
      if (count() % 3 === 0) return 'Fizz';
      return '';
    }),
  })),
);
