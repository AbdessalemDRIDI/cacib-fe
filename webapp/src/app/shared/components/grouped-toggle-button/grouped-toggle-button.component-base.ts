import { KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { groupBy } from 'lodash';
import { PrimeTemplate } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Subject, Subscription } from 'rxjs';
import { AccessibilityDirective } from '../../directives/accessibility.directive';

export const COMPONENT_PROVIDERS = [];
export const COMPONENT_IMPORTS = [
  SelectButtonModule,
  AccessibilityDirective,
  FormsModule,
  PrimeTemplate,
  KeyValuePipe,
];

@Component({ template: '' })
export class GroupedToggleButtonComponentBase implements OnInit, OnDestroy, ControlValueAccessor {
  constructor() {}
  @Input() labelField: string;
  @Input() groupingBy: string;
  @Input() displayMode: string;
  @Input() imgField: string;
  @Input() defaultIcon: string;
  @Input() descriptionField: string;
  @Input() horizontalAlignment: string;
  @Input() style: string;
  @Input() class: string;
  @Input() disabled: string;
  @Output() confirmationMessage = new EventEmitter();

  onChange = (_: any) => {};
  listData: any;
  @Input() set option(value: any) {
    if (value) {
      this.listData = groupBy(value, this.groupingBy);
    }
  }
  querySelect$ = new Subject<any>();
  private subscription: Subscription;
  value;
  propagateChange = (_: any) => {};
  ngOnInit() {
    this.subscription = this.querySelect$.subscribe((data) => {
      this.onChange(data);
    });
  }

  onSelect(event) {
    this.querySelect$.next(event.value);
  }

  writeValue(value: any) {
    if (value) {
      this.querySelect$.next(value);
    }
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showConfirmationMessage(item) {
    this.confirmationMessage.emit(item);
  }
  getPropretyLabel(item: any) {
    return item.value[this.labelField];
  }

  getPropretyDescription(item: any) {
    return item.value[this.descriptionField];
  }

  getPropretyImage(item: any) {
    return 'data:image/jpeg;base64,' + item.value[this.imgField];
  }
}
