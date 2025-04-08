import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { JwtHelperService } from './jwthelper.service';
/**
 * Intercepts and handles the HttpRequest or HttpResponse requests to manage the JWT access tokens
 *
 * This class should not be modified directly.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  tokenGetter: string | null;
  headerName: string;
  authScheme: string;
  whitelistedDomains: Array<string | RegExp>;
  blacklistedRoutes: Array<string | RegExp>;
  throwNoTokenError: boolean;
  skipWhenExpired: boolean;

  constructor(public jwtHelper: JwtHelperService) {
    this.tokenGetter = this.jwtHelper.getAccessToken();
    this.headerName = 'Authorization';
    this.authScheme = 'Bearer ';
    this.whitelistedDomains = [];
    this.blacklistedRoutes = [];
    this.throwNoTokenError = false;
    this.skipWhenExpired = false;
  }

  isBlacklistedRoute(request: HttpRequest<any>): boolean {
    const url = request.url;

    return (
      this.blacklistedRoutes.findIndex((route) =>
        typeof route === 'string'
          ? route === url
          : route instanceof RegExp
            ? route.test(url)
            : false
      ) > -1
    );
  }

  handleInterception(token: string, request: HttpRequest<any>, next: HttpHandler) {
    let tokenIsExpired = false;

    if (!token && this.throwNoTokenError) {
      throw new Error('Could not get token from tokenGetter function.');
    }

    if (token && tokenIsExpired) {
      request = request.clone();
    } else if (
      token /*&& this.isWhitelistedDomain(request)*/ &&
      !this.isBlacklistedRoute(request)
    ) {
      request = request.clone({
        setHeaders: {
          [this.headerName]: `${this.authScheme}${token}`,
        },
      });
    }
    return next.handle(request);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = this.jwtHelper.getAccessToken();
    if (token instanceof Promise) {
      return from(token).pipe(
        mergeMap((asyncToken: string) => {
          return this.handleInterception(asyncToken, request, next);
        })
      );
    } else {
      return this.handleInterception(token, request, next);
    }
  }
}
