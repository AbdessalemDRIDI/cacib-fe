import { Component } from '@angular/core';
import { BreadcrumbComponentBase, COMPONENT_IMPORTS } from './breadcrumb.component-base';

@Component({
  selector: 'vg-breadcrumb',
  standalone: true,
  imports: [COMPONENT_IMPORTS],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent extends BreadcrumbComponentBase {}
