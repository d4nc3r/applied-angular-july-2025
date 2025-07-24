import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../identity/store';

export const isLoggedInGuard: CanActivateFn = () => {
  // true, false, signal of true or false, observable of true or false, or a url to send them to
  const reduxStore = inject(Store);
  return reduxStore.select(selectIsLoggedIn);
};
