import { signal } from '@angular/core';
import { ScreenService } from '@app/core/services/data/screen.service';
import { downloadFile, getParamValue } from '@app/core/utils';
import { Payload } from '@core/api';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  zip,
} from 'rxjs';

/**
 * PartnerPartnerSearchBaseService
 *
 * This service extends the ScreenService and provides functionality
 * for managing data related to the 'Partner-PartnerSearch' screen.
 */
export class PartnerPartnerSearchBaseService extends ScreenService {
  data$ = new BehaviorSubject(undefined);
  pageSize = signal(10);

  constructor() {
    super();
    this.screenId = 'Partner-PartnerSearch';
  }

  /**
   * Refreshes the screen with the given payload.
   *
   * @param payload - The payload to initialize the screen with.
   * @returns The result of initializing the screen.
   */
  refreshScreen(payload: Payload) {
    return this.search(payload);
  }

  /**
   * Listens for refresh events from the shared data service and filters them based on the current screen ID.
   *
   * @returns An observable that emits refresh events for the current screen until the component is destroyed.
   */
  listenToRefresh() {
    return this.shareDataService.getScreenIdToRefresh().pipe(
      takeUntil(this.destroy$),
      filter((parentId) => parentId === this.screenId)
    );
  }
  /**
   * Retrieves the count of elements based on the provided payload.
   * @param payload - The payload for the count request.
   * @returns An Observable that emits the count of aireports.
   */
  count(payload: Payload) {
    this.loading.set(true);
    const params = {};
    const criteria: any = getParamValue(payload.routeParams, 'criteria');
    if (criteria !== null && criteria !== undefined && criteria !== '') {
      params['criteria'] = criteria;
    }
    return this.httpClient.get<any>(`${this.BASE_PATH}/partners/count`, { params }).pipe(
      tap((result) => {
        this.loading.set(false);
        this.totalItems.set(result);
      }),
      catchError((error) => {
        this.loading.set(false);
        return of(0);
      }),
      takeUntil(this.destroy$)
    );
  }

  /**
   * Performs a search operation based on the provided payload.
   * @param payload - The payload containing search parameters.
   * @returns An Observable that emits the search results.
   */
  search(payload: Payload) {
    this.loading.set(true);
    const params = {};
    const criteria: any = getParamValue(payload.routeParams, 'criteria');
    const keys: any = payload.vars['keys'];
    const page: any = payload.vars['page'];
    const size: any = payload.vars['size'];
    const order: any = payload.vars['order'];
    if (criteria !== null && criteria !== undefined && criteria !== '') {
      params['criteria'] = criteria;
    }
    if (keys !== null && keys !== undefined && keys !== '') {
      params['keys'] = keys;
    }
    if (page !== null && page !== undefined && page !== '') {
      params['page'] = page;
    }
    if (size !== null && size !== undefined && size !== '') {
      params['size'] = size;
    }
    if (order !== null && order !== undefined && order !== '') {
      params['order'] = order;
    }
    return this.httpClient.get<any>(`${this.BASE_PATH}/partners/search`, { params }).pipe(
      tap((data) => {
        this.loading.set(false);
        this.message.showHttpMessages(data);
        this.data$.next(data);
        this.pageSize.set(payload.size);
        this.currentPage.set(payload.page);
      }),
      switchMap((data) => this.count({ ...payload, ...payload.vars }).pipe(map((_) => data))),
      catchError((error) => {
        this.loading.set(false);
        return of([]);
      }),
      takeUntil(this.destroy$)
    );
  }

  /**
   * Navigates to a target screen
   */
  edit(payload: Payload) {
    const context = {
      ...payload,
      path: '/partner/partner-edit',
      navigationType: 'switch',
      queryParams: {},
      pathParams: { id: payload.data.code },
    };

    return this.featureService.navigateBySwitch(context);
  }

  /**
   * Navigates to a target screen
   */
  view(payload: Payload) {
    const context = {
      ...payload,
      path: '/partner/partner-view',
      navigationType: 'switch',
      queryParams: {},
      pathParams: { id: payload.data.code },
    };

    return this.featureService.navigateBySwitch(context);
  }

  /**
   * Deletes an item based on the provided payload.
   *
   * @param payload - The data to be deleted. This can be of any type.
   * @returns An Observable that emits the result of the deletion process.
   */
  delete(payload: Payload): Observable<any> {
    this.loading.set(true);
    return of(payload).pipe(
      switchMap((dataExe) => this.executeDelete(dataExe)),
      switchMap((dataPost) => this.postDeleteExecute(dataPost)),
      tap((payload: Payload) => {
        this.loading.set(false);
      }),
      switchMap((data) => zip(this.count(payload), this.search(payload)).pipe(map((_) => data))),

      catchError((error) => {
        this.loading.set(false);
        return of({});
      }),
      takeUntil(this.destroy$)
    );
  }

  /**
   * This is the main method that interacts with the REST API
   * @param data
   * @returns {Observable}
   */
  executeDelete(context): Observable<any> {
    const params = {};
    return this.httpClient.delete<any>(`${this.BASE_PATH}/partners/{code}`, { params });
  }
  /**
   * This method runs after the execute method to display messages
   * @param data
   * @returns {Observable}
   */
  postDeleteExecute(context): Observable<any> {
    this.message.show($localize`:message;deletedWithSuccess:Item deleted successfully`, `success`);
    this.message.showHttpMessages(context);
    return of(context);
  }

  /**
   * Opens a target screen component based on the provided context.
   *
   * @param payload - An object containing the necessary information for navigation, including any relevant data.
   * @returns A promise that resolves when the navigation is successfully completed.
   */
  create(payload: Payload) {
    const context = {
      ...payload,
      path: '/partner/partner-edit',
      navigationType: 'switch',
      queryParams: {},
    };

    return this.featureService.navigateBySwitch(context);
  }

  /**
   * Export method for exporting data.
   * @param payload - The payload to be exported.
   * @returns An Observable that emits the result of the export operation.
   */
  export(payload) {
    this.loading.set(true);
    return of(payload).pipe(
      switchMap((dataExe) => this.preExportExecute(dataExe)),
      switchMap((dataExe) => this.executeExport(dataExe)),
      switchMap((dataPost) => this.postExportExecute(dataPost)),
      map((result) => [result, payload]),
      tap(([result, payload]) => {
        if (
          payload.value === 'Selected' &&
          (!payload.selectedItems || payload.selectedItems.length < 1)
        ) {
          this.message.show($localize`:message;exportWarningMessage:No items selected`, `warn`);
          this.loading.set(false);
          return;
        }
        const fileExtHeader = result.headers.get('File-Extension');
        const fileExtension = fileExtHeader !== null ? '.' + fileExtHeader : '';
        const fileName = 'Partner' + fileExtension;
        downloadFile(result.body, fileName);
        this.loading.set(false);
      }),
      catchError((err: Error) => {
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
  preExportExecute(params): Observable<any> {
    return of(params);
  }
  /**
   * This is the main method that interacts with the REST API
   * @param context
   * @returns {Observable}
   */
  executeExport(context): Observable<any> {
    let dataToExport =
      context.value === 'Selected'
        ? context.selectedItems === undefined
          ? []
          : context.selectedItems
        : null;
    const $$selectedItems =
      !dataToExport || Array.isArray(dataToExport) ? dataToExport : [dataToExport];
    const currentKeys = `id,alias,type,direction,application,processedFlowType,description`;
    const $$exportKeys = context.keys === 'All' ? null : currentKeys;
    const $$exportType = context.exportType.toLowerCase();

    return of({});
  }
  /**
   * This method displays messages
   * @param params
   * @returns {Observable}
   */
  postExportExecute(params): Observable<any> {
    this.message.showHttpMessages(params);
    return of(params);
  }
}
