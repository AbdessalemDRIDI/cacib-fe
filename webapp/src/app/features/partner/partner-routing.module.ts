import { Routes } from '@angular/router';

import { customRoutes } from './custom-partner-routing.module';
import { PartnerPartnerEditComponent } from './partner-edit/partner-partner-edit.component';
import { PartnerPartnerSearchInputComponent } from './partner-search-input/partner-partner-search-input.component';
import { PartnerPartnerSearchComponent } from './partner-search/partner-partner-search.component';
import { PartnerPartnerViewComponent } from './partner-view/partner-partner-view.component';

/**
 * Defines the routes for the Partner feature.
 */
export const routes: Routes = [
  ...customRoutes,

  {
    path: 'partner-edit/:id',
    component: PartnerPartnerEditComponent,
  },
  {
    path: 'partner-edit',
    component: PartnerPartnerEditComponent,
  },

  {
    path: 'partner-search',
    component: PartnerPartnerSearchComponent,
  },
  {
    path: 'partner-search/:id',
    redirectTo: 'partner-search',
  },

  {
    path: 'partner-searchInput',
    component: PartnerPartnerSearchInputComponent,
  },
  {
    path: 'partner-searchInput/:id',
    redirectTo: 'partner-searchInput',
  },

  {
    path: 'partner-view/:id',
    component: PartnerPartnerViewComponent,
  },
  {
    path: 'partner-view',
    component: PartnerPartnerViewComponent,
  },
];
