import { ScreenService } from '@app/core/services/data/screen.service';
import { getParamValue } from '@app/core/utils';
import { Payload } from '@core/api';
import { mergeWith } from 'lodash';
import { Observable, catchError, map, of, switchMap, takeUntil, tap } from 'rxjs';

/**
 * PartnerPartnerEditBaseService
 *
 * This service extends the ScreenService and provides functionality
 * for managing data related to the 'Partner-PartnerEdit' screen.
 */
export class PartnerPartnerEditBaseService extends ScreenService {
  constructor() {
    super();
    this.screenId = 'Partner-PartnerEdit';
    // listen to data changes
    this.listenToDataChanges();
  }

  /**
   * Initializes the screen value based on the provided payload.
   * @param payload - The payload containing the roleName and code.
   * @returns A promise that resolves with the retrieved data.
   */
  initValueService(payload: Payload) {
    if (
      payload.parentId &&
      (payload.roleName || payload.code !== undefined) &&
      !payload.aggregationScreen
    ) {
      const dataKey = [payload.roleName, payload.code].filter(Boolean).join('.');
      return this.shareDataService.getData(payload.parentId, dataKey);
    }
    if (payload.code === undefined) {
      const params = {};
      return this.httpClient.get<any>(`${this.BASE_PATH}/partners/new`, { params });
    } else {
      const params = {};
      const keys: any = payload.vars['keys'];
      const code: any = getParamValue(payload.routeParams, 'id');
      if (keys !== null && keys !== undefined && keys !== '') {
        params['keys'] = keys;
      }
      return this.httpClient.get<any>(`${this.BASE_PATH}/partners/${code}`, { params });
    }
  }
  /**
   * Initializes the value of the screen.
   *
   * @param payload - The payload to initialize the value.
   * @returns An Observable that emits the initialized value.
   */
  initValue(payload: Payload) {
    if (payload.skipApiCall) {
      this.setData(payload.data);
      return this.getData().pipe(takeUntil(this.destroy$));
    }
    this.loading.set(true);
    return this.initValueService(payload).pipe(
      map((result) => {
        this.message.showHttpMessages(result);
        return result || {};
      }),
      tap((data) => {
        this.loading.set(false);
        this.setData(mergeWith(payload?.value, data));
        this.initialized$.next(true);
      }),
      catchError((_) => {
        this.loading.set(false);
        this.setData({});
        return of({});
      }),
      takeUntil(this.destroy$)
    );
  }

  /**
   * Navigates back
   */
  cancel(payload: Payload) {
    return this.featureService.navigateByBack(payload);
  }

  /**
   * This method displays messages
   * @param params
   * @returns {Observable}
   */
  postCancelExecute(params): Observable<any> {
    return of(params);
  }

  save(payload: Payload) {
    this.loading.set(true);
    return of(payload).pipe(
      switchMap((dataExe) => this.executeSave(dataExe)),
      switchMap((dataPost) => this.postSaveExecute(dataPost)),
      tap((result: any) => {
        this.loading.set(false);
        this.navigateAftersave(payload);

        if (payload?.aggregationScreen) {
          this.updateParentData(result, payload?.parentId, payload?.roleName);
        }
        this.refreshParentScreen(payload?.parentId);
      }),
      catchError((error) => {
        this.loading.set(false);
        return of({});
      }),
      takeUntil(this.destroy$)
    );
  }

  /**
   * This is the main method that interacts with the REST API
   * @param context
   * @returns {Observable}
   */
  executeSave(context): Observable<any> {
    const params = {};
    return this.httpClient.post<any>(`${this.BASE_PATH}/partners/save`, context.data, { params });
  }
  /**
   * This method displays messages
   * @param params
   * @returns {Observable}
   */
  postSaveExecute(params): Observable<any> {
    this.message.show($localize`:message;savedWithSuccess:Saved Successfully`, `success`);
    this.message.showHttpMessages(params);
    return of(params);
  }

  /**
   * Navigates to a target screen
   */
  navigateAftersave(payload: Payload) {
    const context = { ...payload };

    return this.featureService.navigateByBack(context);
  }
}
