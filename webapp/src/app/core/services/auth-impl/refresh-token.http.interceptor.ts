import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, concatMap, filter, mergeMap } from 'rxjs/operators';

import { JwtHelperService } from './jwthelper.service';
/**
 * Intercepts and handles the HttpRequest or HttpResponse requests to manage the refresh tokens if enabled
 *
 * This class should not be modified directly.
 */
@Injectable()
export class RefreshTokenHttpInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refresherStream: Subject<boolean> = new Subject<boolean>();
  private offsetTime = 0;
  constructor(
    private jwtHelper: JwtHelperService,
    private _http: HttpClient
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken: any = this.jwtHelper.getRefreshToken();
    const accessToken: any = this.jwtHelper.getAccessToken();

    return this.handleInterception(refreshToken, accessToken, req, next).pipe(
      catchError((err: Error) => {
        this.jwtHelper.catchError(err);
        return throwError(err);
      })
    );
  }

  handleInterception(
    refreshToken: any,
    accessToken: any,
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    if (this.isIgnoredReq(request)) {
      return of(Math.floor(new Date().valueOf() / 1000)).pipe(
        mergeMap((issuingTime) => {
          return next.handle(request).pipe(
            filter((res) => res instanceof HttpResponseBase),
            mergeMap((res: any) => {
              const tokenSetter = this.jwtHelper.setRefreshtoken(res['body']);
              const onError = throwError('Impossible to get a new token');
              if (!tokenSetter) {
                this.jwtHelper.removeAccessToken();
                return onError;
              }
              // consider the time gap between server and client in milliseconds
              this.offsetTime =
                (this.jwtHelper.getRefreshTokenOpts().offsetSeconds || 0) * 1000 +
                this.getDesynchronizationTimesGap(this.jwtHelper.getAccessToken(), issuingTime);
              return of(res);
            })
          );
        })
      );
    }

    if (refreshToken && this.jwtHelper.isTokenExpired(refreshToken, this.offsetTime)) {
      this.jwtHelper.removeAccessToken();
      return throwError('Refresh token expired');
    }

    let tokenObs;
    if (refreshToken) {
      tokenObs = this.refreshTheToken(accessToken);
    } else {
      if (accessToken && this.jwtHelper.isTokenExpired(accessToken, this.offsetTime)) {
        this.jwtHelper.removeAccessToken();
        return throwError('Access token expired');
      }
      tokenObs = of(accessToken);
    }
    return tokenObs.pipe(
      mergeMap(() => {
        return next.handle(request);
      }),
      catchError((err: any) => {
        if (err.status === 401 || err.status === 403) {
          this.jwtHelper.removeAccessToken();
        }
        return throwError(err);
      })
    );
  }

  refreshTheToken(accessToken: string) {
    if (accessToken && !this.jwtHelper.isTokenExpired(accessToken, this.offsetTime)) {
      return of(accessToken);
    }

    if (this.isRefreshing) {
      return new Observable((observer) => {
        this.refresherStream.subscribe((value) => {
          if (!value) {
            observer.next(undefined);
            observer.complete();
          }
        });
      });
    } else {
      return this._refreshTheToken();
    }
  }

  private _refreshTheToken() {
    this.isRefreshing = true;
    return of(this.jwtHelper.getRefreshTokenOpts().payload).pipe(
      mergeMap((payload: any) => {
        let requestTheToken;
        const refreshToken: any = this.jwtHelper.getRefreshToken();

        requestTheToken = this.requestTheToken(payload || [], refreshToken);

        return requestTheToken.pipe(
          mergeMap((res) => {
            const tokenSetter = this.jwtHelper.setRefreshtoken(res);
            const onError = throwError('Impossible to get a new token');
            if (!tokenSetter) {
              return onError;
            }

            return of(res);
          }),
          concatMap((res) => {
            this.isRefreshing = false;
            this.refresherStream.next(this.isRefreshing);
            return of(res);
          }),
          catchError((res: any) => {
            this.isRefreshing = false;
            this.refresherStream.complete();
            return throwError(res);
          })
        );
      })
    );
  }
  /**
   * Ignore the request if it's in the ignorablePathList
   * @param {object} request - The request object
   * @returns boolean
   */
  isIgnoredReq(request: HttpRequest<any>): boolean {
    const requestUrl = new URL(request.url, 'http://www.vermeg.com');
    return (
      (this.jwtHelper.getRefreshTokenOpts().ignorablePathList || []).findIndex((path: any) =>
        typeof path === 'string'
          ? path.endsWith(requestUrl.pathname)
          : path instanceof RegExp
            ? path.test(requestUrl.pathname)
            : false
      ) > -1
    );
  }

  requestTheToken(payload: any, refreshToken: string): Observable<any> {
    let body = new HttpParams();
    if (!this.jwtHelper.getRefreshTokenOpts().tokenName) {
      throw new Error(' no token name !');
    }
    body = body.set(this.jwtHelper.getRefreshTokenOpts().tokenName, refreshToken);
    if (payload instanceof Array) {
      payload.forEach((param) => {
        const headerKey: string = Object.keys(param)[0];
        const headerValue: string = param[headerKey];
        body = body.set(headerKey, headerValue);
      });
    }

    let headers = new HttpHeaders();
    if (this.jwtHelper.getRefreshTokenOpts().headers) {
      this.jwtHelper.getRefreshTokenOpts().headers.forEach((header: any) => {
        const headerKey: string = Object.keys(header)[0];
        const headerValue: string = (header as any)[headerKey];
        headers = headers.set(headerKey, headerValue);
      });
    }

    return this._http.post<{ token: string; refreshToken: string }>(
      this.jwtHelper.getRefreshTokenOpts().endPoint,
      body,
      {
        headers: headers,
        // params: urlParams
        reportProgress: false,
      }
    );
  }

  getDesynchronizationTimesGap(token: string | null, issueDate: number): number {
    const decoded = this.jwtHelper.decodeToken(token);
    if (!decoded.hasOwnProperty('iat') && !decoded.hasOwnProperty('exp')) {
      throw new Error('there is no iat or exp property in jwt');
    }
    return (decoded.iat && decoded.iat - issueDate) || decoded.exp - issueDate;
  }
}
