import { Injectable, Injector } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { kebabCase } from 'lodash';
import { Observable } from 'rxjs';

import { MessagesService as Messages } from '@app/core/services/messages/message.service';
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { MenuService } from '../menu/menu.service';
import { PolicyService } from '../policy/policy.service';
/**
 * This Guard decides if a route can be activated. If all guards return `true`, navigation continues. If any guard returns `false`,
 * navigation is cancelled. If any guard returns a `UrlTree`, the current navigation
 * is cancelled and a new navigation begins to the `UrlTree` returned from the guard.
 *
 * This class should not be modified directly. Instead, you can provide your own service which should extend the default one as follows:
 *
 * Example:
 * ```
 * export class MyAuthGuardService extends AuthGuardService {
 *   // Override methods or add new functionality here
 * }
 * ```
 *
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: AuthGuardService, useClass: MyAuthGuardService }
 * ];
 * ```
 *
 * Methods:
 * - `canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree`
 *   Determines if a route can be activated. Override this method to implement custom authentication logic.
 *
 * - `canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree`
 *   Determines if a child route can be activated. Override this method to implement custom authentication logic for child routes.
 *
 * - `canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean`
 *   Determines if a module can be loaded. Override this method to implement custom logic for lazy-loaded modules.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  /**
   * Default constructor
   */
  constructor(
    protected router: Router,
    protected injector: Injector,
    protected message: Messages,
    protected authService: AuthManagerService,
    private policyService: PolicyService,
    private menuService: MenuService
  ) {}

  /**
   * Determines whether a route can be activated.
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {boolean | Observable<boolean>}
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.checkAuthorization(next, state);
  }
  /**
   * Determines whether a child route can be activated.
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {boolean | Observable<boolean>}
   */
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.checkAuthorization(next, state);
  }
  /**
   * Checks authorization
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {boolean | Observable<boolean>}
   */

  checkAuthorization(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const unfilteredMenu: any[] = this.menuService.getUnfiltredMenu() || [];
    const filteredMenu = this.menuService.getFiltredMenu();
    const url = state.url;
    const isUrlExistsInMenu = this.menuIncludesUrl(unfilteredMenu, url);
    const isMenuAuthorized = this.isMenuAuthorized(url, filteredMenu);
    const isScreenAuthorized = this.isScreenAuthorized(next, this.authService.isLogged());
    const isActive = isUrlExistsInMenu
      ? isMenuAuthorized && isScreenAuthorized
      : isScreenAuthorized;
    if (!isActive) {
      const redirectUri = state.url;
      this.authService.doLogout(redirectUri);
    }
    return isActive;
  }
  /**
   * Checks if the screen's route can be activated
   * @param {ActivatedRouteSnapshot} next
   * @param {boolean} isActive
   * @return {boolean}
   */
  isScreenAuthorized(next: ActivatedRouteSnapshot, isActive: boolean): boolean {
    try {
      const urlSeg = next['_urlSegment']['segments'];
      const featureName = kebabCase(isNaN(urlSeg[0].path) ? urlSeg[0].path : urlSeg[1].path);
      const useCaseName = kebabCase(isNaN(urlSeg[0].path) ? urlSeg[1].path : urlSeg[2].path);
      if (featureName && isActive) {
        const service = this.policyService;
        if (!service.isScreenAuthorized(featureName, useCaseName)) {
          this.message.openErrorMessage(
            $localize`:message;notAllowedToOpenScreen:You are not allowed to open this screen`
          );
          this.router.navigate(['/']);
          isActive = false;
        }
      }
    } catch (error) {
      // no policy service is provided for this feature
    }
    return isActive;
  }

  /**
   * Checks if a given URL is authorized within a menu structure.
   * @param {string} url
   * @param {any[]} menu
   * @return {boolean}
   */
  isMenuAuthorized(url: string, menu: any[]): boolean {
    if (menu && url != '/') {
      if (Array.isArray(menu)) {
        return this.menuIncludesUrl(menu, url);
      }
      return false;
    } else {
      return true;
    }
  }

  /**
   * Recursively checks if a URL is included in a menu items structure.
   * @param {any[]} items
   * @param {string} url
   * @return {boolean}
   */
  menuIncludesUrl(items, url): boolean {
    const regex = /^\/\d+\/(?=\D)/;
    const match = url.match(regex);
    const urlWithoutWorspaceID = match ? url.slice(match[0].length - 1) : url;
    for (const item of items) {
      if (item.link && item.link[0] !== '/' && urlWithoutWorspaceID.startsWith(item.link[0])) {
        return true;
      }
      if (item.items) {
        return this.menuIncludesUrl(item.items, urlWithoutWorspaceID);
      }
    }
    return false;
  }
}
