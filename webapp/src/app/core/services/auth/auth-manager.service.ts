import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { LOGOUT_ACTIVE_TABS } from '@app/core/api';
import { environment } from '@env/environment';
import { JwtHelperService } from '@services/auth-impl/jwthelper.service';
import { Profile } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';
import { TranslatorService } from '../translator/translator.service';
import { HttpUrlEncodingCodec } from './encoder';
const LOCALE_ID = `${environment.prefix}_locale_id`;
const PROFILE = `${environment.prefix}_profile`;
/**
 * The main security class that authenticates and disconnects the user, checks if the user is `logged on` or `not` and
 * provides the user's roles and name.
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyAuthManagerService extends AuthManagerService {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: AuthManagerService, useClass: MyAuthManagerService }
 * ];
 * ```
 * */
@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  BASE_PATH = environment.basePath;
  /**
   * The source emitter for the client's brand name
   */
  brandSubject = new ReplaySubject<string>();
  /**
   *  the active tabs broad cast channel to send data betwwen active tabs
   */
  activeTabschannel = new BroadcastChannel(null);
  /**
   * Change password option
   */
  resetPassword: boolean;
  /**
   * Path uiSecurity.json
   */
  filePath: string = 'assets/security/ui-security.json';
  securityData;

  /**
   * Service responsible for managing user profiles.
   */
  profileService = inject(ProfileService);

  /**
   * The translator service used for managing translations.
   */
  translator = inject(TranslatorService);

  /**
   * The login failure message
   */
  errorMessage = signal('');

  /**
   * Represents the loading state of the authentication api call.
   */
  loading = signal(false);

  /**
   * Default constructor
   */
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected router: Router,
    protected service: JwtHelperService
  ) {
    this.initBrandName();
  }
  /**
   * Authenticates a user with the provided credentials and optionally redirects to a specified URI.
   *
   * @param credential - The user's credentials containing a username and password.
   * @param redirectUri - (Optional) The URI to redirect to upon successful authentication.
   */
  authenticateUser(credential, redirectUri?: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });

    const body = new HttpParams({
      encoder: new HttpUrlEncodingCodec(),
      fromObject: {
        username: credential.username,
        password: credential.password,
      },
    }).toString();

    this.loading.set(true);
    this.http
      .post(`${this.BASE_PATH}/security/authenticate`, body, {
        headers,
      })
      .pipe(
        switchMap((_) =>
          this.profileService.get().pipe(
            tap((profile) => this.logInSuccessfully({ ...profile }, redirectUri)),
            catchError((_) => {
              this.logInSuccessfully(
                {
                  ...this.profileService.getDefault(),
                },
                redirectUri
              );
              return of(_);
            })
          )
        ),
        catchError((error) => {
          this.loading.set(false);
          this.errorMessage.set('This user/password pair does not exist');
          return of(error);
        })
      )
      .subscribe((_) => {
        this.loading.set(false);
        if (this.isChangePasswordRequired()) {
          this.resetPassword = this.isChangePasswordRequired();
        }
      });
  }

  /**
   * Handles successful login by storing the user's profile and language preference,
   * navigating to the specified redirect URI, and initializing the language settings.
   *
   * @param {Profile} profile - The user's profile information.
   * @param {string} [redirectUri] - Optional URI to redirect to after login. Defaults to '/' if not provided.
   */
  logInSuccessfully(profile: Profile, redirectUri?: string) {
    localStorage.setItem(LOCALE_ID, profile.language);
    localStorage.setItem(PROFILE, JSON.stringify(profile));
    this.router.navigate([redirectUri || '/']);
    this.translator.initLanguage();
    this.translator.applyPreferredLanguage();
  }
  /**
   * Checks if the current user is `logged on` `not`
   * @return {boolean}
   */
  isLogged(): any {
    return this.service.isLogged();
  }
  /**
   * Checks if the `change password` option is required
   * @return {boolean}
   */
  isChangePasswordRequired(): boolean {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken = this.decodeToken();
      return decodedToken?.resetPwd ?? false;
    }
  }
  /**
   * Gets the user's roles
   * @return {array}
   */
  getRoles(): any {
    return this.service.getRoles();
  }
  /**
   * check if the current user is allowed
   * @param {object} rolesBase - roles base list
   * @return {string} boolean
   */
  isUserRolesHas(rolesBase: Set<String> = new Set(['admin'])): boolean {
    return this.getRoles() && this.getRoles().filter((role) => rolesBase.has(role)).length > 0;
  }
  /**
   * Returns the access token
   * @returns {any} the access token if exists
   */
  getAccessToken(): any {
    return this.service.getAccessToken();
  }
  /**
   * Clears the access and refresh tokens
   * @returns {void}
   */
  removeAccessToken(): void {
    this.service.removeAccessToken();
  }
  /**
   * Decodes the JWT access token
   */
  decodeToken(): any {
    return this.service.decodeToken();
  }
  /**
   * Gets the user's name
   * */
  getUserName(): string {
    return this.service.getUserName();
  }
  /**
   * Gets the user's name
   * */
  getName(): string {
    return this.getUserName();
  }
  /**
   * Post the logout request using access token
   * @returns {Observable<any>}
   */
  logout(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });

    const body = new HttpParams({
      fromObject: {
        accessToken: this.getAccessToken(),
      },
    }).toString();

    this.http
      .post(`${this.BASE_PATH}/security/logout`, body, {
        headers,
      })
      .pipe(
        catchError((error) => {
          this.doLogout();
          return of(error);
        })
      )
      .subscribe((_) => this.doLogout());
  }
  /**
   * Logout the user
   */
  doLogout(redirectUri?: string) {
    this.removeAccessToken();
    this.logoutActiveTabs();
    if (redirectUri) {
      this.router.navigate(['/login'], { queryParams: { redirect_uri: redirectUri } });
    } else {
      this.router.navigate(['/login']);
    }
  }
  /**
   * Implement this method in a custom service to set the brand name for
   * your users from token, cookie, REST call...etc
   */
  initBrandName() {
    /**
    this.brandSubject.next('example');
    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params['brand']) {
          this.brandSubject.next(params['brand']);
        }
      });
      */
  }

  /*
   * Fetch the security data Observable
   */
  getSecurity(httpBackend: HttpBackend) {
    return httpBackend.handle(new HttpRequest('GET', this.filePath)).pipe(
      map((response: any) => response.body),
      catchError((error) => of({})),
      tap((data) => (this.securityData = data))
    );
  }

  /*
   * Returns the security data as Object
   */
  getSecurityData() {
    return this.securityData;
  }
  /**
   * Posts a logout event to all active tabs using the Broadcast Channel API.
   * When received by active tabs, this event can trigger logout actions.
   */
  logoutActiveTabs() {
    this.activeTabschannel.postMessage({ eventName: LOGOUT_ACTIVE_TABS });
  }
}
