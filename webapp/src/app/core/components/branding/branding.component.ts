import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthManagerService } from '@app/core/services/auth/auth-manager.service';
const BRANDS_PATH = 'assets/brands/';
/**
 * This component adds a dynamic stylesheet by client.
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'vp-branding',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandingComponent implements OnInit, OnDestroy {
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthManagerService
  ) {}

  /**
   * Initializes the main component
   * @returns {void}
   */
  ngOnInit() {
    this.authService.brandSubject.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.loadStyle(data);
    });
  }
  /**
   * Add the stylesheet to the header
   * @param styleName
   */
  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById('client-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = this.getStyleName(styleName);
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = this.getStyleName(styleName);
      head.appendChild(style);
    }
  }
  /**
   * Gets the path of the style name
   * @param brandName
   * @return {string}
   */
  getStyleName(brandName: string) {
    return `${BRANDS_PATH}${brandName}/style.css`;
  }

  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
