import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { RoutedLink } from './routed-link';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { IdentityActions } from '../../shared/identity/actions';
import { selectIsLoggedIn } from '../../shared/identity/store';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoutedLink, RouterLink],
  template: ` <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          @for (link of links(); track link.label) {
            <li><app-routed-link [href]="link.href" [label]="link.label" /></li>
          }
        </ul>
      </div>
      <a routerLink="" class="btn btn-ghost text-xl">Home</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        @for (link of links(); track link.label) {
          <li><app-routed-link [href]="link.href" [label]="link.label" /></li>
        }
      </ul>
    </div>
    <div class="navbar-end">
      <!-- only show login button if i'm not logged in -->
      @if (sub()) {
        <button (click)="logOut()" class="btn">Log Out</button>
      } @else {
        <button (click)="logIn()" class="btn">Log In</button>
      }
    </div>
  </div>`,
  styles: ``,
})
export class NavBar {
  reduxStore = inject(Store);
  // sub = this.reduxStore.select(selectIsLoggedIn); <-- the old way, returns an observable
  sub = this.reduxStore.selectSignal(selectIsLoggedIn); // <-- new, sleek, awesome

  logIn() {
    this.reduxStore.dispatch(IdentityActions.loginRequested());
  }

  logOut() {
    this.reduxStore.dispatch(IdentityActions.logoutRequested());
  }

  links = signal([
    { href: ['about'], label: 'About' },
    { href: ['demos'], label: 'Demos' },
    { href: ['links'], label: 'Shared Links' },
    { href: ['counter-lab'], label: 'Counter Lab' },
  ]);
}
