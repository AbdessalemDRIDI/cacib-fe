import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { getNumberOfCardsPerRow, getScrollHeight } from '@app/core/utils';
import { PrimeTemplate } from 'primeng/api';
import { VirtualScrollerLazyLoadEvent, VirtualScrollerModule } from 'primeng/virtualscroller';

export const COMPONENT_PROVIDERS = [];
export const COMPONENT_IMPORTS = [
  VirtualScrollerModule,
  PrimeTemplate,
  NgClass,
  NgTemplateOutlet,
  AsyncPipe,
];

/**
 * This Generic Component displays a chart from chart.js library
 * It takes as input some properties and data to display
 */
@Component({ template: '' })
export class VirtualScrollComponentBase implements OnInit {
  @ContentChild('itemTemplate', { read: TemplateRef, static: false })
  itemTemplate: TemplateRef<any>;

  /**
   *The height of the viewport
   */
  scrollSize: any;

  /**
   *The number of rows per page
   */
  rowsNumber: number;

  /***
   * The height of the card to display
   */
  @Input() itemHeight: number;

  /***
   * The value of the table
   */
  @Input() valueObservable: Observable<any>;

  /**
   * Card breakpoints
   */
  @Input() rowCols: string;

  /**
   * Number of items to be displayed per page
   */
  @Input() pageSizeVs: number;

  /**
   * Event to be emitted when scrolling
   */
  @Output() loadPage = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.scrollSize = getScrollHeight(this.rowCols, this.itemHeight, this.pageSizeVs) + 'px';
    this.rowsNumber = getNumberOfCardsPerRow(this.rowCols);
  }
  loadPageEvent(event: VirtualScrollerLazyLoadEvent) {
    this.loadPage.emit(event);
  }
}
