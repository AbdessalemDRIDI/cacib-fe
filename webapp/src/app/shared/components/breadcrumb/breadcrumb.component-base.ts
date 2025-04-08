import { Component, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { EventEmitter } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

export const COMPONENT_PROVIDERS = [];
export const COMPONENT_IMPORTS = [BreadcrumbModule];
@Component({ template: '' })
export class BreadcrumbComponentBase implements OnInit, OnDestroy {
  /**
   * Home URL
   */
  @Input() homeURL: string;

  /**
   * Home clicked event
   */
  @Output() homeClicked = new EventEmitter<boolean>();

  /**
   * Home breadcrumb item
   */
  homeBreadcrumb: MenuItem;
  /**
   * Injected services
   */
  breadcrumbService = inject(BreadcrumbService);
  breadcrumbItems = toSignal(this.breadcrumbService.getBreadcrumbItems(), {
    initialValue: [],
  });
  ngOnInit() {
    this.breadcrumbService.clear();
    this.homeBreadcrumb = this.breadcrumbService.initHomeBreadcrumbItem(this.homeURL);
  }
  /**
   * The method associated with the click event of the breadcrumb item
   * @param item
   */
  onItemClick({ item }: MenuItem) {
    if (item?.routerLink === '/') {
      this.homeClicked.emit(true);
    }
  }
  ngOnDestroy(): void {
    this.breadcrumbService.clear();
  }
}
