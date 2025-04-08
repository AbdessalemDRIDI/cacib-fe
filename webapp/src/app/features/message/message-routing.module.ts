import { Routes } from '@angular/router';

import { customRoutes } from './custom-message-routing.module';
import { MessageMessageEditComponent } from './message-edit/message-message-edit.component';
import { MessageMessageSearchInputComponent } from './message-search-input/message-message-search-input.component';
import { MessageMessageSearchComponent } from './message-search/message-message-search.component';
import { MessageMessageViewComponent } from './message-view/message-message-view.component';

/**
 * Defines the routes for the Message feature.
 */
export const routes: Routes = [
  ...customRoutes,

  {
    path: 'message-edit/:id',
    component: MessageMessageEditComponent,
  },
  {
    path: 'message-edit',
    component: MessageMessageEditComponent,
  },

  {
    path: 'message-search',
    component: MessageMessageSearchComponent,
  },
  {
    path: 'message-search/:id',
    redirectTo: 'message-search',
  },

  {
    path: 'message-searchInput',
    component: MessageMessageSearchInputComponent,
  },
  {
    path: 'message-searchInput/:id',
    redirectTo: 'message-searchInput',
  },

  {
    path: 'message-view/:id',
    component: MessageMessageViewComponent,
  },
  {
    path: 'message-view',
    component: MessageMessageViewComponent,
  },
];
