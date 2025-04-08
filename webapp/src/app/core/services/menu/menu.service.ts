import { Injectable } from '@angular/core';
import { AuthManagerService } from '@services/auth/auth-manager.service';

import { environment } from '@env/environment';
/**
 * A service that manages the main menu's entries according to the user's roles and
 * gets/sets the option of expanding or collapsing the menu's panel in the localStorage.
 *
 * This service should not be modified directly. You can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyMenuService extends MenuService {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: MenuService, useClass: MyMenuService }
 * ];
 * ```
 * */
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  /**
   * The local storage key
   */
  LOCAL_STORAGE_KEY: string;
  /**
   * The default state of the menu's panel
   */
  menuInitialState: boolean;
  filteredMenu: any[];
  menu: any[];
  constructor(private authService: AuthManagerService) {
    this.LOCAL_STORAGE_KEY = `${environment.prefix}_${this.authService.getUserName()}_Menu`;
  }
  /**
   * Filters the main menu's entries according to the user's roles
   * @param menu
   */
  filterByRole(menu: any[], listMenuFromSecurity: any[]) {
    this.filteredMenu = menu.filter((item) => {
      const itemId = item.id;
      const roles = listMenuFromSecurity?.[itemId]?.roles || [];
      roles.push('admin');
      const hasRole = this.authService.isUserRolesHas(new Set(roles));
      if (item.items) {
        item.items = this.filterMenuItems(item.items, itemId, listMenuFromSecurity);
      }
      return hasRole;
    });
    return this.filteredMenu;
  }
  /**
   * Sets the main menu.
   *
   * @param menu - The main menu to be set.
   */
  setMenu(menu) {
    this.menu = menu;
  }

  /**
   * Gets the filtered menu.
   *
   * @returns The filtered menu.
   */
  getFiltredMenu() {
    return this.filteredMenu;
  }

  /**
   * Gets the unfiltered menu.
   *
   * @returns The unfiltered menu.
   */
  getUnfiltredMenu() {
    return this.menu;
  }

  /**
   * Filters the items of menu's entries according to the user's roles
   * @param items
   * @param parentId
   * @param listMenuFromSecurity
   */

  filterMenuItems(items: any[], parentId: string, listMenuFromSecurity: any): any[] {
    return items.filter((subItem) => {
      const subItemId = `${parentId};${subItem.id}`;
      const roles = listMenuFromSecurity?.[subItemId]?.roles || [];
      roles.push('admin');
      const hasRole = this.authService.isUserRolesHas(new Set(roles));
      if (subItem.items) {
        subItem.items = this.filterMenuItems(subItem.items, subItemId, listMenuFromSecurity);
      }
      return hasRole;
    });
  }
  /**
   * Store in the localStorage the option of expanding or collapsing the menu's panel
   * @param value
   */
  setMenuState(value) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, value ? 'expanded' : 'collapsed');
  }
  /**
   * Gets from the localStorage the option of expanding or collapsing the menu's panel
   */
  getMenuInitialState() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY) === 'expanded' ? true : false;
  }
}
