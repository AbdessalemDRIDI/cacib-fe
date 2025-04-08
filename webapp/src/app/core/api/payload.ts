import { ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RouteParams } from './routeparams';
import { WizardStep } from './wizard-step';

/**
 * Represents the payload object used in API requests or action calls.
 */
export interface Payload {
  /**
   * The dialog container reference.
   */
  dialogContainer?: ViewContainerRef;

  /**
   * The call container reference.
   */
  callContainer?: ViewContainerRef;

  /**
   * The container reference.
   */
  container?: ViewContainerRef;

  /**
   * The screen ID.
   */
  screenId?: string;

  /**
   * The parent ID.
   */
  parentId?: string;

  /**
   * The role name.
   */
  roleName?: string;

  /**
   * The workspace ID.
   */
  workSpaceId?: number;

  /**
   * The state object.
   */
  state?: { [key: string]: any };

  /**
   * The variables object.
   */
  vars?: { [key: string]: any };

  /**
   * The route parameters.
   */
  routeParams?: RouteParams;

  /**
   * The data object.
   */
  data?: any;

  /**
   * The value object.
   */
  value?: any;

  /**
   * The keys string.
   */
  keys?: string;

  /**
   * The code string or number.
   */
  code?: any;

  /**
   * The page number.
   */
  page?: number;

  /**
   * The size number.
   */
  size?: number;

  /**
   * The row ID string or number.
   */
  rowId?: string | number;

  /**
   * The order string.
   */
  order?: string;

  /**
   * The criteria string.
   */
  criteria?: string;

  /**
   * The list of selected rows.
   */
  rowsIdList?: any[];

  /**
   * The files object.
   */
  files?: { [key: string]: any };

  /**
   * The group index of an array form.
   */
  groupIndex?: number;

  /**
   * The master index of an array form.
   */
  masterIndex?: number;

  /**
   * The target wizard step.
   */
  target?: WizardStep;

  /**
   * Path params
   */
  pathParams?: { [key: string]: any };

  /**
   * Query params
   */
  queryParams?: { [key: string]: any };

  /**
   * The route path
   */
  path?: string;

  /**
   * The array form item index
   */
  index?: number;

  /**
   * A form control
   */
  control?: AbstractControl;

  /**
   * Selected table rows
   */
  rows?: any[];

  /**
   * File name to upload
   */
  fileName?: string;

  /**
   * Flag to skip API call.
   */
  skipApiCall?: boolean;
  
  /**
   * Flag to indicate if the screen is an aggregation screen.
   */
  aggregationScreen?: boolean;
}
