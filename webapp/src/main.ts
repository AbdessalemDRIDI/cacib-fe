/// <reference types="@angular/localize" />

import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { AppComponent } from './app/app.component';

import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { routes } from '@app/app-routing.module';
import { MenuService } from '@app/core/services/menu/menu.service';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { CustomCurrencyPipe } from '@app/shared/pipes/currency.pipe';
import { GridPipe } from '@app/shared/pipes/grid.pipe';
import { NumberPipe } from '@app/shared/pipes/number.pipe';
import { Globals } from '@core/global/globals';
import { AuthManagerService } from '@core/services/auth/auth-manager.service';
import { MessagesService } from '@core/services/messages/message.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtModule } from '@services/auth-impl/jwt-token.module';
import { RequestInterceptorService } from '@services/request-interceptor/request-interceptor.service';
import { ConfirmationService } from 'primeng/api';
import { CUSTOM_APP_PROVIDERS } from './custom-main';

import { ReloadStrategy } from '@core/reuse-strategy/reload-strategy';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Navigator {
    msSaveBlob;
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => boolean;
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export function initializeApp(httpBackend: HttpBackend, authService: AuthManagerService) {
  return () => {
    return authService.getSecurity(httpBackend);
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      })
    ),
    importProvidersFrom(JwtModule.forRoot()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    { provide: 'menuService', useClass: MenuService },
    { provide: 'translatorService', useClass: TranslatorService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    { provide: 'environment', useValue: { ...environment } },
    {
      provide: 'MESSAGES_SERVICE',
      useExisting: MessagesService,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [HttpBackend, AuthManagerService],
    },
    { provide: RouteReuseStrategy, useClass: ReloadStrategy },

    Globals,
    ConfirmationService,
    DatePipe,
    CurrencyPipe,
    NumberPipe,
    DecimalPipe,
    GridPipe,
    CustomCurrencyPipe,

    ...CUSTOM_APP_PROVIDERS,
  ],
}).catch((err) => console.log(err));
