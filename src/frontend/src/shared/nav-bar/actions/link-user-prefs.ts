import { createActionGroup, props } from '@ngrx/store';
import { TagPrefsState } from '../store';

export const NavBarUserPrefsActions = createActionGroup({
  source: 'Navbar User Prefs',
  events: {
    'Tag Prefs Changed': props<{ payload: TagPrefsState }>(),
  },
});
