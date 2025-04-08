import { Location } from '@angular/common';
import { inject, Injectable, ViewContainerRef } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationType, Payload } from '@app/core/api';
import { ScreenDialogComponent } from '@app/shared/components/screen-dialog/screen-dialog.component';
import { createComponent } from '@core/utils';
import { ProfileService } from '@services/profile/profile.service';
import { TranslatorService } from '@services/translator/translator.service';
import { get, isNil, omitBy } from 'lodash';
import { of } from 'rxjs';
/**
 * This utility service provides the following functionalities:
 * - Access to some global services like ProfileService and TranslatorService.
 * - Navigates to nested routes using different navigation types (switch, forward, back).
 * - Provides a method to open adynamicly a component in a dialog or a container.
 * - Provides methods to navigate to a route using different navigation types.
 *
 * This class should not be modified directly. You can extend this service to provide your own implementation as follows:
 *
 * ```
 * export class MyFeatureService extends FeatureService {
 *   ...
 * }
 * ```
 *
 * And provide your class in the `custom-main.ts` file as follows:
 *
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: FeatureService, useClass: MyFeatureService }
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  /**
   * The boolean possible values
   */
  public booleanValues = of([
    { label: $localize`:message;true:True`, value: true },
    { label: $localize`:message;false:False`, value: false },
  ]);

  private location = inject(Location);

  /**
   * Default  Constructor of the component
   */
  constructor(
    private formBuilderServ: UntypedFormBuilder,
    private profileServ: ProfileService,
    private translatorServ: TranslatorService,
    private router: Router
  ) {}
  /**
   * Get the profile manager service
   * @return {ProfileService}
   */
  get profileService(): ProfileService {
    return this.profileServ;
  }
  /**
   * Get the translator service
   * @return {TranslatorService}
   */
  get translatorService(): TranslatorService {
    return this.translatorServ;
  }
  /**
   * Get angular reactive form builder
   * @return {FormBuilder}
   * @deprecated
   */
  get formBuilder(): UntypedFormBuilder {
    return this.formBuilderServ;
  }

  /**
   * Gets the action's payload to fire search action in a virtual lazy table
   * @param payload
   * @param pageSize
   * @param first
   * @param totalItems
   * @param orderKeys
   */
  getVirtualLazyPayload(
    payload: Payload,
    pageSize: number,
    page: number,
    orderKeys = undefined,
    criteria = undefined
  ) {
    const actionPayload = { ...payload };
    actionPayload['vars']['page'] = page;
    actionPayload['vars']['size'] = pageSize;
    actionPayload['page'] = page;
    if (orderKeys) {
      actionPayload['order'] = orderKeys;
    }
    if (criteria) {
      actionPayload['criteria'] = criteria;
    }
    return actionPayload;
  }

  /**
   * Sets the focus on the first editorCell element of a grid
   * @param event
   */
  clickOnCellEditorElement(event): void {
    let firstCellEditorElement: HTMLElement = event.srcElement.getElementsByTagName(
      'p-celleditor'
    )[0] as HTMLElement;
    firstCellEditorElement?.click();
  }

  /**
   * Navigates based on the provided navigation type and payload.
   *
   * @param navigationType - The type of navigation to perform. Can be 'switch', 'forward', or 'back'.
   * @param payload - The payload containing navigation details.
   * @returns A promise that resolves to true if navigation is successful, or false if navigation is canceled.
   * @throws Will throw an error if the navigation type is invalid.
   */
  navigateBy(navigationType: NavigationType, payload: Payload) {
    navigationType = navigationType || NavigationType.SWITCH;
    switch (navigationType) {
      case 'switch':
      case 'forward':
        const queryParams = { ...payload.queryParams };
        const pathParams = payload.pathParams
          ? Object.values(omitBy(payload.pathParams, isNil))
          : [];
        const url = isNaN(payload.workSpaceId)
          ? payload.path
          : `/${payload.workSpaceId}/${payload.path}`;
        // close the opnend screen dialog
        payload?.container?.clear();
        return this.router.navigate([url, ...pathParams], {
          queryParams,
          state: { ...get(payload, 'state', {}) },
          replaceUrl: payload['type'] === 'forward' ? true : false,
        });
      case 'back':
        if (payload?.container) {
          payload?.container?.clear();
        } else {
          return this.location.back();
        }
        break;
      default:
        throw new Error(`Invalid navigation type: ${navigationType}`);
    }
  }

  /**
   * Navigates using the SWITCH navigation type.
   *
   * @param payload - The payload containing the necessary data for navigation.
   */
  navigateBySwitch(payload: Payload) {
    this.navigateBy(NavigationType.SWITCH, payload);
  }

  /**
   * Navigates forward using the provided payload.
   *
   * @param payload - The payload containing navigation details.
   */
  navigateByForward(payload: Payload) {
    this.navigateBy(NavigationType.FORWARD, payload);
  }

  /**
   * Navigates back to the previous route.
   *
   * @param payload - The payload containing navigation parameters.
   */
  navigateByBack(payload: Payload) {
    this.navigateBy(NavigationType.BACK, payload);
  }

  openComponent(
    componentImpot: Promise<any>,
    container: ViewContainerRef,
    data: any,
    config?: any
  ) {
    if (data?.navigationType === 'dialog') {
      const dialogComponentRef = container.createComponent(ScreenDialogComponent);
      dialogComponentRef.instance.openComponent(componentImpot, { ...data, pContainer: container });
    } else {
      createComponent(componentImpot, container, data, config);
    }
  }
}
