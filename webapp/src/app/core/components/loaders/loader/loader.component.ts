import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '@core/components/loaders/services/loader.service';
/**
 * This Component displays a spinner when it receives a `true` value
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  standalone: true,
})
export class LoaderComponent implements OnDestroy, OnInit {
  /**
   * The property to show or hide the spinner
   */
  show = false;
  /**
   * @private
   */
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {}
  /**
   * Subscribes to the emitter source value 'loaderState'
   */
  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: boolean) => {
      this.show = state;
    });
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
