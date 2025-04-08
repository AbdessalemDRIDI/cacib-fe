import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payload } from '@core/api';
import { ScreenComponent } from '@core/features/screen.component';
import { getParamCode } from '@core/utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Partner as PartnerModel } from '@models/partner.model';

import { PartnerPartnerViewService } from './services/partner-partner-view.service';

import { COMMON_IMPORTS } from '../../../shared/common/common-imports';

export const COMPONENT_PROVIDERS = [PartnerPartnerViewService];
export const COMPONENT_IMPORTS = [...COMMON_IMPORTS];

/**
 * This is the base Component that visualizes an object data.
 * This component is auto generated by `UI Studio` tool for a screen of type `View`, please refer to our official documentation for more informations:
 * https://wiki.vermeg.com/display/PFD/Components+Store#ComponentsStore-EditComponentStoreViewscreen
 *
 * It is highly recommended to avoid modifying this class, otherwise you can override all the generated methods & variables in
 * the inherited class PartnerPartnerViewComponent.
 **/
@Component({
  template: '',
  selector: 'app-partner-partner-view-base',
})
export class PartnerPartnerViewBaseComponent extends ScreenComponent implements OnInit {
  /**
   * Represents the input data for the Component.
   */
  @Input() data: PartnerModel;

  /**
   * Represents the output data for the Component.
   */
  @Output() dataChange = new EventEmitter();

  /**
   * Injected Services
   **/
  screenService = inject(PartnerPartnerViewService);
  screenId = this.screenService.screenId;

  /**
   * True if the component is initialized after calling the initValueAction
   */
  initialized = false;
  /**
   * The stored variables like `page`, `pageSize`, `keys`...etc
   */
  vars: any = {};
  /**
   * Represents an observable that holds the data of the screen.
   */
  data$: Observable<PartnerModel>;
  /**
   * Property that shows or hides the header of the screen's component
   */
  @Input() showHeader = true;
  /**
   * Property that shows or hides the footer of the screen's component
   */
  @Input() showFooter = true;
  /**
   * Property that deactivates the navigation routing
   */
  @Input() disableNavigation = false;
  /**
   * The technical keys of the input fields
   */
  keys = `id,alias,type,direction,application,processedFlowType,description`;

  /**
   * Default  Constructor of the component
   */
  constructor(router: Router, activeRoute: ActivatedRoute) {
    super(activeRoute, router);
  }
  /**
   * Initializes the component.
   */
  ngOnInit() {
    super.ngOnInit();
    this.loading = this.screenService.getLoading();
    this.screenService
      .initValue({
        ...this.getActionPayload(),
        value: this.data,
      })
      .subscribe();
    this.data$ = this.screenService
      .getData()
      .pipe(tap((value) => (this.data = { ...this.data, ...value })));
  }

  /**
   * Retrieves the action payload.
   * @returns The action payload object.
   */
  getActionPayload(): Payload {
    return {
      ...super.getActionPayload(),
      parentId: this.parentId,
      vars: { ...this.vars, keys: this.keys },
      keys: this.keys,
      data: { ...this.data },
      code: getParamCode(this.routeParams.params),
    };
  }

  getDefaultTitle() {
    return $localize`:@@UID__title;partner;partner-view:View`;
  }

  /**
   * Executes the back action
   * @return {void}
   */
  doBack(): void {
    this.screenService.back({ ...this.getActionPayload() });
  }
  /**
   * Executes the edit action
   * @return {void}
   */
  doEdit(): void {
    this.screenService.edit({ ...this.getActionPayload() });
  }
}
