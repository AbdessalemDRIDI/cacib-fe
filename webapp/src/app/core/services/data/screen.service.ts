import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, OnDestroy, inject, signal } from '@angular/core';
import { Payload } from '@app/core/api';
import { uniq, untilChanged } from '@app/core/utils';
import { environment } from '@env/environment';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Subject, filter, map, of, takeUntil } from 'rxjs';
import { ConditionEvaluatorService } from '../condition-evaluator/condition-evaluator.service';
import { FeatureService } from '../feature/feature.service';
import { MessagesService as Messages } from '../messages/message.service';
import { ShareDataService } from './share-data.service';

@Injectable()
export class ScreenService implements OnDestroy {
  /**
   * The base REST API path
   */
  BASE_PATH = environment.basePath;
  /**
   * The unique identifier for the screen.
   */
  private _screenId: string;
  /**
   * Service for accessing feature-related functionalities.
   */
  featureService = inject(FeatureService);
  /**
   * The injector for resolving dependencies.
   */
  injector = inject(Injector);
  /**
   * Client for making HTTP requests.
   */
  httpClient = inject(HttpClient);
  /**
   * Service for sharing data between components.
   */
  shareDataService = inject(ShareDataService);
  /**
   * Service for handling messages and notifications.
   */
  message = inject(Messages);
  /**
   * A BehaviorSubject holding the current data. Emits new data whenever it is updated.
   */
  data$ = new BehaviorSubject<any>(undefined);
  /**
   * A BehaviorSubject indicating whether the screen has been initialized.
   */
  initialized$ = new BehaviorSubject(false);
  /**
   * Represents the loading state of the screen service.
   */
  loading = signal(false);

  /**
   * A BehaviorSubject holding the current page of a search screen. Emits new data whenever it is updated.
   */
  currentPage = signal(1);

  /**
   * A BehaviorSubject holding the number of items in search screen. Emits new data whenever it is updated.
   */
  totalItems = signal(0);

  /**
   * The condition evaluator service.
   */
  conditionEvaluator = inject(ConditionEvaluatorService);

  /**
   * Service for handling confirmation dialogs.
   */
  confirmationServ = inject(ConfirmationService);

  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Gets the current screen ID.
   * 
   * @returns {string} The ID of the current screen.
   */
    get screenId() {
      return this._screenId;
    }
  
   /**
    * Sets the screen ID after ensuring its uniqueness.
    * 
    * @param screenId - The screen ID to be set.
    */
    set screenId(screenId: string) {
      this._screenId = uniq(screenId);
    }

  /**
   * Listens to data changes and updates the data$ subject with the new data.
   */
  listenToDataChanges() {
    this.shareDataService
      .getData(this.screenId)
      .pipe(
        untilChanged,
        map((data) => data),
        filter(Boolean)
      )
      .subscribe((data) => {
        this.data$.next(Array.isArray(data) ? [...data] : { ...this.data$.value, ...data });
      });
  }

  /**
   * Retrieves the screen data as an observable.
   * @returns An observable that emits the data.
   */
  getData() {
    return this.data$.asObservable().pipe(
      takeUntil(this.destroy$),
      filter((data) => data !== undefined)
    );
  }

  /**
   * Stores the given data associated with the specified screen ID in a shared store,
   * allowing other screens to access this data as needed.
   *
   * @param data - The data to be shared. This can be of any type.
   *
   */
  setData(data: any) {
    this.data$.next(data);
    this.shareData({ data });
  }

  /**
   * Updates the data with the provided value.
   *
   * @param data - The data to be updated.
   */
  updateData(data: any) {
    this.setData(this.data$.value ? { ...this.data$.value, ...data } : data);
  }

  /**
   * Gets the loading status.
   * @returns {WritableSignal<boolean>} The loading status.
   */
  getLoading() {
    return this.loading;
  }

  /**
   * Stores the given data associated with the specified screen ID in a shared store,
   * allowing other screens to access this data as needed.
   *
   * @param data - The data to be shared. This can be of any type.
   * @param screenId - The identifier of the screen with which the data is associated. This is usually a string.
   *
   */
  shareData(data) {
    this.shareDataService.shareData(data, this.screenId);
  }

  /**
   * Updates the parent data with the provided data, screen ID, and optional path.
   *
   * @param data The data to update the parent with.
   * @param screenId The ID of the screen.
   * @param path The optional path to specify the location of the data within the parent.
   */
  updateParentData(data: any, parentScreenId: string, path?: string) {
    this.shareDataService.updateData(data, parentScreenId, path);
  }

  /**
   * Retrieves data from the parent component.
   *
   * @param parentScreenId - The ID of the parent screen.
   * @param path - Optional. The path to the data.
   * @returns The data retrieved from the parent component.
   */
  getDataFromParent(parentScreenId: string, path?: string) {
    return this.shareDataService.getData(parentScreenId, path).pipe(takeUntil(this.destroy$));
  }

  /**
   * Refreshes the screen with the given payload.
   *
   * @param payload - The payload to initialize the screen with.
   * @returns The result of initializing the screen.
   */
  refreshScreen(payload: Payload) {
    return this.initValue(payload);
  }
  /**
   * Refreshes the parent data by setting the refresh screens data in the shared data service.
   *
   * @param payload - The data payload to be used for refreshing the screens.
   */
  refreshParentScreen(parentId: string) {
    this.shareDataService.setScreenToRefresh(parentId);
  }
  /**
   * Initializes the value of the screen.
   *
   * @param payload - The payload to initialize the value.
   * @returns An Observable that emits the initialized value.
   */
  initValue(payload: Payload) {
    return of({});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
