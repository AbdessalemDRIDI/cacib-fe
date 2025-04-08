import { Directive, HostBinding, Input } from '@angular/core';
import { TTSelectableRow } from 'primeng/treetable';
/* eslint-disable @angular-eslint/no-host-metadata-property */

/**
 * For accessibility purposes, used to override the default behavior of PrimeNG
 * and remove the `aria-checked` attribute.
 */
@Directive({
  selector: '[cttSelectableRow]',
  host: {
    class: 'p-element',
    '[class.p-highlight]': 'selected',
    '[attr.data-p-highlight]': 'selected',
    '[attr.aria-checked]': 'removeAria',
  },
  standalone: true,
})
export class CustomTTselectableRowDirective extends TTSelectableRow {
  @Input('cttSelectableRow') rowNode: any;
  @HostBinding('attr.aria-checked')
  removeAria = undefined;
}
