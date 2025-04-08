import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * This service enables displaying or hiding a loader by emitting values to the Subject observable.
 *
 * This service should not be modified directly. You can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyLoaderService extends LoaderService {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: LoaderService, useClass: MyLoaderService }
 * ];
 * ```
 */
@Injectable({ providedIn: 'root' })
export class LoaderService {
  /**
   * Subject event emitter
   */
  private loaderSubject = new Subject<boolean>();
  /**
   * Observable event emitter
   */
  loaderState = this.loaderSubject.asObservable();
  /**
   * Displays the loader
   * @returns {void}
   */
  show() {
    this.loaderSubject.next(true);
  }
  /**
   * Hides the loader
   * @returns {void}
   */
  hide() {
    this.loaderSubject.next(false);
  }
}
