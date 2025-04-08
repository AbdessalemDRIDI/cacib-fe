import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getParamCode,
  isFormEmpty,
  mergeObjects,
  patchValue,
  untilChanged,
  validateForm,
} from '@app/core/utils';
import { Payload } from '@core/api';
import { ScreenComponent } from '@core/features/screen.component';
import { cloneDeep, isNil, omitBy } from 'lodash';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MessageMessageEditService } from './services/message-message-edit.service';

import { COMMON_IMPORTS } from '../../../shared/common/common-imports';

export const COMPONENT_PROVIDERS = [MessageMessageEditService];
export const COMPONENT_IMPORTS = [...COMMON_IMPORTS];

/**
 * This is the base Component that displays and manages a Reactive Form logic.
 * This component is auto generated by `UI Studio` tool for a screen of type `Edit`, please refer to our official documentation for more informations:
 * https://wiki.vermeg.com/display/PFD/Components+Store#ComponentsStore-EditComponentStoreEditscreen
 *
 * It is highly recommended to avoid modifying this class, otherwise you can override all the generated methods & variables in
 * the inherited class MessageMessageEditComponent.
 **/
@Component({
  template: '',
  selector: 'app-message-message-edit-base',
})
export class MessageMessageEditBaseComponent extends ScreenComponent implements OnInit {
  /**
   * Represents the input data for the Component.
   */
  @Input() data;

  /***
   * Notify the screen about the form status
   */
  @Output() formStatus = new EventEmitter();
  /**
   * Represents the output data for the Component.
   */
  @Output() dataChange = new EventEmitter();

  /**
   * True if the component is initialized after calling the initValueAction
   */
  initialized = false;
  /**
   * Injected Services
   **/
  screenService = inject(MessageMessageEditService);
  /**
   * The unique identifier of the component
   */
  @Input() screenId: string = this.screenService.screenId;
  /**
   * The formBuilder instance.
   */
  formBuilder = inject(UntypedFormBuilder);

  /**
   * Represents an observable that holds the data of the screen.
   */
  data$: Observable<any>;

  /**
   * The technical keys of the input fields
   */
  keys = `id,messageContent,messageType,dateReceived,status`;

  /**
   * Default Constructor of the component:
   */
  constructor(router: Router, activeRoute: ActivatedRoute) {
    super(activeRoute, router);
  }
  /**
   * Initializes the component.
   */
  ngOnInit() {
    super.ngOnInit();
    this.form = this.createForm();
    this.loading = this.screenService.getLoading();
    this.form.valueChanges.pipe(untilChanged, takeUntil(this.destroy$)).subscribe((value) => {
      this.data = mergeObjects(this.data, value);
      if (this.autoEmitDataChanges) {
        this.dataChange.emit(this.data);
      }
      this.formStatus.emit({ isValid: this.isFormValid(), isEmptyForm: isFormEmpty(this.form) });
    });
    this.screenService.initValue({ ...this.getActionPayload(), value: this.data }).subscribe();
    this.data$ = this.screenService.getData();
    this.data$.pipe(takeUntil(this.destroy$)).subscribe((data) => this.init(data, this.isNilOn));
  }

  /**
   * Initializes the component by the provided data object
   * @param item
   */
  init(item, isNilEnabled = true) {
    this.data = {
      ...cloneDeep(this.data),
      ...(isNilEnabled ? omitBy(cloneDeep(item), isNil) : cloneDeep(item)),
    };
    patchValue(this.data, this.form);
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

  /**
   * Creates a form group for the MessageEdit component.
   * @returns The created form group.
   */
  createForm(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, [Validators.min(-9223372036854776000), Validators.max(9223372036854776000)]],
      messageContent: [null, []],
      messageType: [null, []],
      dateReceived: [null, []],
      status: [null, []],
    });
  }

  getDefaultTitle() {
    return $localize`:@@UID__title;message;message-edit:Edit`;
  }

  /**
   * Executes the cancel action
   * @return {void}
   */
  doCancel(): void {
    this.screenService.cancel({ ...this.getActionPayload() });
  }

  /**
   * Executes the save action
   * @return {void}
   */
  doSave(): void {
    if (this.isFormValid()) {
      this.screenService.save({ ...this.getActionPayload() }).subscribe();
    } else {
      validateForm(this.form);
    }
  }
}
