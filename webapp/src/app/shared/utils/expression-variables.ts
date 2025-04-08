export * from '../expression-custom-variables';
import { Injector } from '@angular/core';
import { Profile } from '@app/core/services/profile/profile.model';
import { ProfileService } from '@app/core/services/profile/profile.service';
import { AuthManagerService } from '@services/auth/auth-manager.service';

/**
 * The following methods can be used to transmit global variables to web services or incorporate them into expressions
 * In UI Studio you can use the following methods by writing fn.NAME_OF_THE_METHOD(value, param1, param2...)
 */

/**
 * Returns the current date and time.
 * @return {Date} The current date and time.
 */
export function getCurrentDate(): Date {
  return new Date();
}

/**
 * Returns the current month as a number (1-12).
 * @return {number} The current month.
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

/**
 * Returns the current year as a number.
 * @return {number} The current year.
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Retrieves the user's name from the authentication service.
 * @param {import('./AuthManagerService')} injector - The injector used to fetch the authentication service.
 * @return {string} The user's name.
 */
export function getUserName(injector: Injector): string {
  const authService = injector.get(AuthManagerService);
  return authService.getUserName();
}

/**
 * Retrieves the user's roles from the authentication manager.
 * @param {import('./AuthManagerService')} injector - The injector used to fetch the authentication service.
 * @return {string[]} An array of user roles.
 */
export function getUserRoles(injector: Injector): string[] {
  const authService = injector.get(AuthManagerService);
  return authService.getRoles();
}

/**
 * Retrieves the user's profile.
 * @param {import('./ProfileService')} injector - The injector used to fetch the profile service.
 * @return {Profile} The profile object.
 */
export function getProfile(injector: Injector): Profile {
  return injector?.get(ProfileService)?.getProfile();
}

/**
 * Retrieves the current locale.
 * @param {import('./ProfileService')} injector - The injector used to fetch the profile service.
 * @return {Profile} The profile object.
 */
export function getLocale(injector: Injector): string {
  return injector?.get(ProfileService)?.getLocale();
}

/**
 * Retrieves the current date format.
 * @param {import('./ProfileService')} injector - The injector used to fetch the profile service.
 * @return {Profile} The profile object.
 */
export function getDateFormat(injector: Injector): string {
  return injector?.get(ProfileService)?.getCurrentDateFormat();
}

/**
 * Retrieves the number format.
 * @param {import('./ProfileService')} injector - The injector used to fetch the profile service.
 * @return {Profile} The profile object.
 */
export function getNumberFormat(injector: Injector): string {
  return injector?.get(ProfileService)?.getCurrentNumberFormat();
}

/**
 * Retrieves the time format.
 * @param {import('./ProfileService')} injector - The injector used to fetch the profile service.
 * @return {Profile} The profile object.
 */
export function getTimeFormat(injector: Injector): string {
  return injector?.get(ProfileService)?.getCurrentTimeFormat();
}

/**
 * Retrieves the decimal symbol.
 * @param {import('./ProfileService')} injector - The injector used to fetch the profile service.
 * @return {Profile} The profile object.
 */
export function getDecimalSymbol(injector: Injector): string {
  return injector?.get(ProfileService)?.getDecimalSymbol();
}

/**
 * Retrieves the grouping symbol.
 * @param {import('./ProfileService')} injector - The injector used to fetch the profile service.
 * @return {Profile} The profile object.
 */
export function getGroupingSymbol(injector: Injector): string {
  return injector?.get(ProfileService)?.getGroupingSymbol();
}
