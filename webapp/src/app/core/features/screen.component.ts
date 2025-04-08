import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payload, RouteParams } from '@core/api';
import { getParamValue, mergeParams } from '@core/utils';
import { environment } from '@env/environment';
import { ShareDataService } from '@services/data/share-data.service';
import { get, merge } from 'lodash';
import { Subject, combineLatest, map, pairwise, takeUntil } from 'rxjs';
import { FeatureService } from '../services/feature/feature.service';

/**
 * The base class for all screens supported by `UI Studio` tool:
 * https://wiki.vermeg.com/display/PFD/Components+Store#ComponentsStore-Screens
 *
 * This class should not be modified.
 */
@Component({
  template: '',
})
export class ScreenComponent implements OnChanges, OnInit, OnDestroy {
  /**
   * The base REST API path
   */
  BASE_PATH = environment.basePath;
  /**
   * Reference to the view container where the component is rendered.
   */
  @ViewChild('callContainer', { read: ViewContainerRef, static: false })
  callContainer!: ViewContainerRef;

  /**
   * Reference to the container where the dialog is rendered.
   */
  @ViewChild('dialogContainer', { read: ViewContainerRef, static: false })
  dialogContainer!: ViewContainerRef;

  /**
   * The container for the view, where the component is rendered.
   * It can be the dialog container or the call container.
   */
  container: ViewContainerRef;
  /**
   * The unique identifier of the component
   */
  screenId: string;
  /**
   * The ID of the parent screen.
   */
  parentId: string;
  /**
   * The name of the role associated with the screen.
   */
  roleName: string;
  /**
   * The shared parameters
   */
  params: { [key: string]: any } = {};
  /**
   * The stored variables like `page`, `pageSize`, `keys`...etc
   */
  vars: any = {};
  /**
   * The routing state that may contains parameters like data shared by the caller component
   */
  state: any = {};
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**
   * The loading Observable
   */
  loading = signal(false);
  /**
   * The configured technical keys
   */
  keys: string;
  /**
   * The JSON data to be handled
   */
  data: any;
  /**
   * The form builder
   */
  form: UntypedFormGroup;
  /**
   * Technical Property to enable ignoring setting null properties in the main data object
   */
  isNilOn = true;
  /**
   * Service for sharing data between components.
   */
  sharedDataService = inject(ShareDataService);

  /**
   * The injector used for dependency injection.
   */
  injector = inject(Injector);

  /**
   * The service responsible for managing features.
   */
  featureService = inject(FeatureService);

  /**
   * The HTTP client used for making HTTP requests.
   */
  httpClient = inject(HttpClient);

  /**
   * Represents the change detector reference.
   */
  cd = inject(ChangeDetectorRef);

  /**
   * Represents the route parameters for the screen component.
   */
  @Input()
  routeParams: RouteParams;

  /**
   * Indicates whether the screen is initialized.
   */
  isInitialized = signal(false);

  /**
   * An object to track the validation status of each child form.
   */
  subFormsStatus: { [key: string]: boolean } = {};
  
  /**
   * Indicates whether the data is be passed as input.
   */
  dataAsInput: boolean;

  /**
   * Indicates whether the value should be emitted to the parent component.
   */
  autoEmitDataChanges = true;

  constructor(
    protected activeRoute: ActivatedRoute,
    protected router: Router
  ) {}

  /**
   * Responds to changes in the input properties of the component.
   *
   * @param changes - An object of key/value pairs for the set of changed inputs.
   *                  The key is the name of the changed input property and the value is an instance of SimpleChange.
   *
   * If the `data` input property changes, sets `dataAsInput` to true.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.dataAsInput = true;
    }
  }

  /**
   * Initiliazes the main properties of the component such as identifier, caller context...etc
   */
  ngOnInit() {
    this.parentId = this.parentId || this.activeRoute.snapshot.params.pId;
    this.roleName = this.roleName || this.activeRoute.snapshot.params.rn;
    this.routeParams = this.routeParams || {
      queryParams: { ...this.activeRoute.snapshot.queryParams },
      params: { ...this.activeRoute.snapshot.params },
    };
    this.params = { ...this.defaultParams() };
    this.state = this.state || get(this.router.getCurrentNavigation(), 'extras.state', {});
    this.isNilOn = this.isNilEnabled();
    this.updateRouteParams();
    this.isInitialized.set(true);
  }

  /**
   * Updates the route parameters by combining the active route's params and query params.
   * Subscribes to changes in the route parameters and updates the `routeParams` property accordingly.
   */
  updateRouteParams() {
    combineLatest([this.activeRoute.params, this.activeRoute.queryParams])
      .pipe(
        takeUntil(this.destroy$),
        pairwise(),
        map(([prev, curr]) => mergeParams(prev, curr))
      )
      .subscribe(([params, queryParams]) => {
        this.routeParams = merge(this.routeParams, {
          queryParams: { ...queryParams },
          params: { ...params },
        });
      });
  }

  /**
   * The default properties
   */
  defaultParams() {
    return {
      screenId: this.screenId,
      state: { ...this.state },
      routeParams: this.routeParams,
      parentId: this.parentId,
      roleName: this.roleName,
      workSpaceId: this.router.url.split('/')[1],
      skipApiCall: this.dataAsInput,
      aggregationScreen: this.routeParams?.queryParams?.aggregationScreen
    };
  }

  /**
   * Get parameter value from the activeRoute
   * @param paramKey
   * @returns
   */
  getParamValue(paramKey): boolean {
    return getParamValue(this.routeParams, paramKey);
  }

  /**
   * Retrieves the action payload.
   * @returns The action payload object.
   */
  getActionPayload(): Payload {
    return {
      ...this.params,
      dialogContainer: this.dialogContainer,
      callContainer: this.callContainer,
      container: this.container,
    };
  }

  /**
   * True if the control has passed all of its validation tests,
   * false otherwise.
   */
  isFormValid() {
    return this.form?.valid || this.form?.disabled ? true : false;
  }
  /**
   * Remove fromTo fields from the given data object.
   * @param {Object} data - The data object from which fields will be removed.
   * @param {string[]} fromToFields - An array of strings containing fromTo fields to be removed from the data object.
   * @returns {Object} - The modified data object after removing fromTo fields.
   */
  ignoreFromToFields(data: any, fromToFields: string[]) {
    fromToFields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        delete data[field];
      }
    });
    return data;
  }

  /**
   * Get date format from the profile
   * @param {string} temporalType
   * @param {string} datePrecision
   * @return {string} the date format
   */
  getDateFormat(temporalType: string, datePrecision?: string): string {
    return this.featureService.profileService.getDateFormat(temporalType, datePrecision);
  }

  /**
   * Checks if the screen is initialized.
   *
   * @param id - Optional parameter specifying the screen ID.
   * @returns A boolean indicating whether the screen is initialized or not.
   */
  isScreenInitialized(id?: string) {
    return this.isInitialized();
  }

  /**
   * Override this method to force setting null values returned from the WS or State
   * */
  isNilEnabled() {
    return true;
  }

  /**
   * Opens the target screen.
   *
   * This method should be implemented in the child class to define the specific behavior
   * for opening the target screen.
   */
  openTargetScreen() {
    // To be implemented in the child class
  }

  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.sharedDataService.clearData(this.screenId);
  }
}
