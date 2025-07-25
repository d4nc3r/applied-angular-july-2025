import { ActivatedRouteSnapshot, CanActivateFn, Routes } from '@angular/router';
import { Links } from './links';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
import { Edit } from './pages/edit';
import { isLoggedInGuard } from '../shared/routing/logged-in-guard';
import { LinksStore } from './services/links-store';
import { Store } from '@ngrx/store';
import { selectSub } from '../shared/identity/store';
import { inject } from '@angular/core';
import { LinkApiService } from './services/links-api';
export const LINKS_ROUTES: Routes = [
  {
    path: '',
    component: Links,
    providers: [LinksStore, LinkApiService], // provide to ME and any of my CHILDREN, but is not global
    children: [
      { path: '', component: List },
      {
        path: ':id/edit',
        component: Edit,
        canActivate: [isLoggedInGuard, isOwnerOfLinkGuard],
      },
      { path: 'prefs', component: Prefs, canActivate: [isLoggedInGuard] },
    ],
  },
];

function isOwnerOfLinkGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const store = inject(LinksStore);
    const userSub = inject(Store).selectSignal(selectSub);
    const linkId = route.paramMap.get('id');

    if (linkId === null || userSub() === null) {
      return false;
    }

    const link = store.entityMap()[linkId];
    if (!link) return false;
    return link.owner === userSub();
  };
}
