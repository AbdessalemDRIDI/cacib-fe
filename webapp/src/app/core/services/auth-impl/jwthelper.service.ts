import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { environment } from '@env/environment';
/**
 * The main security class that authenticates and disconnects the user using the basic authentication technique based on
 * JWT tokens
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyJwtHelperService extends JwtHelperService {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 *  export const CUSTOM_APP_PROVIDERS = [
 *    { provide: MyJwtHelperService, useClass: JwtHelperService }
 * ]
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class JwtHelperService {
  accessToken = '';
  profile = '';
  localeId = '';
  refreshToken = '';
  refreshService = '';
  loginService = '';
  logoutService = '';
  tokenName: 'refreshToken';

  constructor(public router: Router) {
    this.accessToken = `${environment.prefix}_access_token`;
    this.profile = `${environment.prefix}_profile`;
    this.localeId = `${environment.prefix}_locale_id`;
    this.refreshToken = `${environment.prefix}_refresh_token`;
    this.refreshService = `${environment.basePath}/security/refreshToken`;
    this.loginService = `${environment.basePath}/security/authenticate`;
    this.logoutService = `${environment.basePath}/security/logout`;
  }

  /**
   * Returns the access token from the local storage
   * @returns {string | null} the access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  /**
   * Clears the access and refresh tokens from local storage
   */
  removeAccessToken() {
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem(this.refreshToken);
    localStorage.removeItem(this.profile);
    localStorage.removeItem(this.localeId);
  }
  /**
   * Get the preferred_username of the logged user
   * @return {string } the preferred_username of the user
   */
  getUserName() {
    const decodedToken = this.decodeToken();
    return decodedToken !== undefined && decodedToken !== null
      ? decodedToken['username'] || decodedToken.preferred_username
      : '';
  }

  /**
   * Returns the access token options
   * @returns {Object}
   */
  getAccessTokenOpts(): {} {
    return {
      tokenGetter: this.getAccessToken,
      tokenRemover: this.removeAccessToken,
    };
  }
  /**
   * Returns the refresh token from the local storage
   * @returns {string | null} the refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshToken);
  }
  /**
   * Stores the access token and the refresh token if enabled
   * in the local storage
   */
  setRefreshtoken(res: any): boolean {
    if (res) {
      if (!res['token']) {
        this.removeAccessToken();
        return false;
      }
      localStorage.setItem(this.accessToken, res['token']);
      if (res['refreshToken']) {
        localStorage.setItem(this.refreshToken, res['refreshToken']);
      }
    }
    return true;
  }

  /**
   * Get the roles of the logged user
   * @return {array} the roles of the user
   */
  getRoles(): string[] {
    const decodedToken = this.decodeToken();
    const roles = decodedToken?.roles || decodedToken?.realm_access?.roles || [];
    return Array.isArray(roles) ? roles : [];
  }

  /**
   * Test if the current user is logged by checking if there is
   * an access token stored in the local storage or not
   * @return {boolean}
   */
  isLogged(): boolean {
    return this.decodeToken() ? true : false;
  }

  /**
   * Defines the behaviour when errors occur
   * @returns {boolean}
   */
  catchError(err: any): boolean {
    // auto logout if 401 unauthorised status is returned from api
    if (err.status === 401) {
      this.router.navigate(['/login']);
    }
    return true;
  }
  getRefreshTokenOpts(): any {
    return {
      endPoint: `${this.refreshService}`,
      headers: [
        { Accept: '*/*' },
        { 'Cache-control': 'no-cache' },
        { 'Cache-control': 'no-store' },
        { Expires: '0' },
        { Pragma: 'no-cache' },
      ],
      ignorablePathList: [
        `${this.refreshService}`,
        `${this.loginService}`,
        `${this.logoutService}`,
      ],
      payload: [],
      tokenName: 'refreshToken',
      offsetSeconds: 15, // 604740;
      tokenGetter: this.getRefreshToken.bind(this),
      tokenSetter: this.setRefreshtoken.bind(this),
      tokenRemover: this.removeAccessToken.bind(this),
      catchError: this.catchError.bind(this),
    };
  }

  decodeToken(value?: any): any {
    const token = value ? value : this.getAccessToken();
    if (token) {
      return jwtDecode(token);
    }
    return false;
  }

  getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);
    const date = new Date(0);
    if (!decoded.hasOwnProperty('exp')) {
      return date;
    }
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  isTokenExpired(token: string, offsetSeconds?: number, defaultDate = new Date(0)): boolean {
    const date = this.getTokenExpirationDate(token) || defaultDate;
    offsetSeconds = offsetSeconds || 0;
    // Token expired?
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds);
  }
}
