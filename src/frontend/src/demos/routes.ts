import { Routes } from '@angular/router';
import { Demos } from './demos';
import { SignalsDemo } from './pages/signals-demo';
export const DEMOS_ROUTES: Routes = [
  {
    path: '',
    component: Demos,
    children: [{ path: 'signals', component: SignalsDemo }],
  },
];
