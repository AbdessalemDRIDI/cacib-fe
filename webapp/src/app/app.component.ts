import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LOGOUT_ACTIVE_TABS } from '@core/api';
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { BrandingComponent } from './core/components/branding/branding.component';
import { LoaderMaskComponent } from './core/components/loaders/loader-mask/loader-mask.component';
import { TranslatorService } from './core/services/translator/translator.service';
import { removeElementFromDom } from './shared/utils/dom-utils';

/**
 * The main entry point component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [LoaderMaskComponent, BrandingComponent, RouterOutlet],
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * The component's state property (loaded or not yet)
   */
  loaded = false;
  /**
   * The show loading option
   */
  showLoading = signal(false);
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**
   * The Subjet initializer emitter object
   */
  private initialized$: Observable<boolean>;

  constructor(
    private router: Router,
    private translator: TranslatorService,
    private authService: AuthManagerService
  ) {}

  /**
   * Initializes the state and value of the component
   */
  ngOnInit() {
    this.translator.initLanguage();
    this.loaded = true;
    this.handleActiveTabsAuthentication();
    this.toggleLoadingIndicator();
  }

  /**
   * Toggles the loading indicator based on the router events.
   */
  toggleLoadingIndicator() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showLoading.set(true);
        removeElementFromDom([
          'p-dropdown-panel',
          'p-contextmenu-overlay',
          'p-multiselect-panel',
          'vp-filter-overlay',
        ]);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.showLoading.set(false);
      }
    });
  }

  /**
   * Listens for logout events from active tabs using the Broadcast Channel API.
   * When a logout event is received, it navigates the user to the login page.
   **/
  private handleActiveTabsAuthentication() {
    if (this.authService.activeTabschannel) {
      this.authService.activeTabschannel.onmessage = (event) => {
        const eventName = event?.data?.eventName;
        if (eventName && eventName === LOGOUT_ACTIVE_TABS) {
          this.router.navigate(['/login']);
        }
      };
    }
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.authService?.activeTabschannel?.close();
  }
}
