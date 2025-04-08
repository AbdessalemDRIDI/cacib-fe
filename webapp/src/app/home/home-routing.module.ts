import { Routes } from '@angular/router';

import { MainComponent } from '@app/home/home.component';
import { Error404Component } from '@core/components/error-404/error-404.component';

export const routes: Routes = [
  // palmyra-needle-angular-add-main-route Do not delete this line. Palmyra will add new route here
  {
    path: '',
    component: MainComponent,
    children: [
      // {
      //   path: 'iframe',
      //   loadChildren: () => import('../core/components/screen/screen.module').then((m) => m.ScreenModule)
      // },
      {
        path: '',
        loadChildren: () => import('../features/features-routing.module').then((m) => m.routes),
      },
      {
        path: ':wsId',
        loadChildren: () => import('../features/features-routing.module').then((m) => m.routes),
      },
    ],
  },
  { path: '**', component: Error404Component },
];
