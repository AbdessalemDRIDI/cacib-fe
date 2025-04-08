import { Routes } from '@angular/router';

import { AuthGuardService } from '@services/auth-guard/auth-guard.service';
import { featuresRoutes } from './custom-features-routes';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    data: { notReusable: true },
    children: [
      ...featuresRoutes,
      // palmyra-needle-angular-add-child-route: Do not delete this line
      {
        path: 'partner',
        loadChildren: () => import('./partner/partner-routing.module').then((m) => m.routes),
      },

      {
        path: 'message',
        loadChildren: () => import('./message/message-routing.module').then((m) => m.routes),
      },

      /* Do not write your custom code here, it will be replaced by the generated content */
      // end palmyra-needle-angular-add-child-route
    ],
  },
];
