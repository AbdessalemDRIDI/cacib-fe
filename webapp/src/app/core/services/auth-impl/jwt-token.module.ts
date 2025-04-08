import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { JwtInterceptor } from './jwt.interceptor';
import { RefreshTokenHttpInterceptor } from './refresh-token.http.interceptor';

@NgModule()
export class JwtModule {
  static forRoot(): ModuleWithProviders<JwtModule> {
    return {
      ngModule: JwtModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RefreshTokenHttpInterceptor,
          multi: true,
        },
      ],
    };
  }
}
