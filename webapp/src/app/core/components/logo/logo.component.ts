import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthManagerService } from '@app/core/services/auth/auth-manager.service';
const BRANDS_PATH = 'assets/brands/';
/**
 * This component displays the logo by client of provided.
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'vp-logo',
  templateUrl: './logo.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent implements OnInit, OnDestroy {
  logoPath = 'assets/img/logo.png';
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  authService = inject(AuthManagerService);

  /**
   * Initializes the main component
   * @returns {void}
   */
  ngOnInit() {
    this.authService.brandSubject.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.logoPath = `${BRANDS_PATH}${data}/logo.png`;
    });
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
