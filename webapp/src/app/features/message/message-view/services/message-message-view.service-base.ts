import { ScreenService } from '@app/core/services/data/screen.service';
import { getParamValue } from '@app/core/utils';
import { Payload } from '@core/api';
import { mergeWith } from 'lodash';
import { Observable, catchError, of, takeUntil, tap } from 'rxjs';

/**
 * MessageMessageViewBaseService
 *
 * This service extends the ScreenService and provides functionality
 * for managing data related to the 'Message-MessageView' screen.
 */
export class MessageMessageViewBaseService extends ScreenService {
  constructor() {
    super();
    this.screenId = 'Message-MessageView';
  }

  /**
   * Initializes the value of the screen.
   *
   * @param payload - The payload to initialize the value.
   * @returns An Observable that emits the initialized value.
   */
  initValue(payload: Payload): Observable<any> {
    if (payload.skipApiCall) {
      this.setData(payload.data);
      return this.getData().pipe(takeUntil(this.destroy$));
    }
    if (payload.parentId && (payload.roleName || payload.code !== undefined)) {
      const dataKey = [payload.roleName, payload.code].filter(Boolean).join('.');
      return this.getDataFromParent(payload.parentId, dataKey).pipe(
        tap((data) => {
          this.data$.next(data);
        })
      );
    } else {
      this.loading.set(true);
      const params = {};
      const keys: any = payload.vars['keys'];
      const code: any = getParamValue(payload.routeParams, 'id');
      if (keys !== null && keys !== undefined && keys !== '') {
        params['keys'] = keys;
      }
      return this.httpClient.get<any>(`${this.BASE_PATH}/messages/${code}`, { params }).pipe(
        tap((result) => {
          this.message.showHttpMessages(result);
          this.setData(mergeWith(payload?.value, result || {}));
          this.loading.set(false);
          this.initialized$.next(true);
        }),
        catchError((error) => {
          this.setData({});
          this.loading.set(false);
          this.initialized$.next(true);
          return of({});
        }),
        takeUntil(this.destroy$)
      );
    }
  }

  /**
   * Navigates back
   */
  back(payload: Payload) {
    return this.featureService.navigateByBack(payload);
  }

  /**
   * This method displays messages
   * @param params
   * @returns {Observable}
   */
  postBackExecute(params): Observable<any> {
    return of(params);
  }

  edit(payload: Payload) {
    const context = {
      ...payload,
      path: '/message/message-edit',
      navigationType: 'forward',
      queryParams: {},
      pathParams: { id: payload.data.code },
    };

    return this.featureService.navigateByForward(context);
  }
}
