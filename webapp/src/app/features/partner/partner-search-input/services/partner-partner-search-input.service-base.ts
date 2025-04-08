import { ScreenService } from '@app/core/services/data/screen.service';
import { Payload } from '@core/api';
import { BehaviorSubject, Observable, catchError, of, switchMap, takeUntil, tap } from 'rxjs';

/**
 * PartnerPartnerSearchInputBaseService
 *
 * This service extends the ScreenService and provides functionality
 * for managing data related to the 'Partner-PartnerSearchInput' screen.
 */
export class PartnerPartnerSearchInputBaseService extends ScreenService {
  initialized$ = new BehaviorSubject<boolean>(true);
  /**
   * A BehaviorSubject holding the current data. Emits new data whenever it is updated.
   */
  data$ = new BehaviorSubject<any>({});

  constructor() {
    super();
    this.screenId = 'Partner-PartnerSearchInput';
    // listen to data changes
    this.listenToDataChanges();
  }

  /**
   * Navigates to a target screen
   */
  openTargetScreen(payload: Payload) {
    const context = {
      ...payload,
      navigationType: 'call',
      queryParams: {
        criteria: payload.criteria.toString(),
      },
      loading: this.loading,
    };
    const componentImport = import(
      `@features/partner/partner-search/partner-partner-search.component`
    );
    this.featureService.openComponent(componentImport, payload.callContainer, context);
  }

  /**
   * Executes the `moreFilters` operation.
   *
   * @param payload - The payload for the operation.
   * @returns An Observable that emits the result of the operation.
   */
  moreFilters(payload: Payload) {
    this.loading.set(true);
    return of(payload).pipe(
      switchMap((dataExe) => this.executeMoreFilters(dataExe)),
      switchMap((dataPost) => this.postMoreFiltersExecute(dataPost)),
      tap((result: any) => {
        this.loading.set(false);
      }),

      catchError((error) => {
        this.loading.set(false);
        return of({});
      }),
      takeUntil(this.destroy$)
    );
  }
  /**
   * This method runs first to control or validate the input data
   * @param params
   * @returns {Observable}
   */
  preMoreFiltersExecute(params): Observable<any> {
    return of(params);
  }
  /**
   * This is the main method that interacts with the REST API
   * @param context
   * @returns {Observable}
   */
  executeMoreFilters(context): Observable<any> {
    //throw new Error('action more-filters has no API to request');
    return of({});
  }

  postMoreFiltersExecute(params): Observable<any> {
    this.message.showHttpMessages(params);
    return of(params);
  }

  /**
   * Navigates to a target screen
   */
  search(payload: Payload) {
    const context = {
      ...payload,
      navigationType: 'call',
      queryParams: {
        criteria: payload.criteria.toString(),
      },
      loading: this.loading,
    };
    const componentImport = import(
      `@features/partner/partner-search/partner-partner-search.component`
    );
    this.featureService.openComponent(componentImport, payload.callContainer, context);
  }
}
