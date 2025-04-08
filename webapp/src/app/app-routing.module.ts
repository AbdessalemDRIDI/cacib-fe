import { Routes } from '@angular/router';

import { AuthGuardService } from '@services/auth-guard/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { appRoutes } from './custom-app-routes';

export const routes: Routes = [
  ...appRoutes,
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () => import('@app/home/home-routing.module').then((m) => m.routes),
    canActivate: [AuthGuardService],
  },
];
