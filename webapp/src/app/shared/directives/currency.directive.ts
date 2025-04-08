import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { ProfileService } from '@services/profile/profile.service';
import { CustomCurrencyPipe } from '@shared/pipes/currency.pipe';
import { CurrencyFormatterBaseDirective } from './currency-base.directive';
/**
 * Directive that formats the Currency values. It is mainly used in the `currency` component supported by ÙI Studio`tool.
 *
 * You can override the CurrencyFormatter directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[plmCurrencyFormatter]',
  standalone: true,
})
export class CurrencyFormatterDirective
  extends CurrencyFormatterBaseDirective
  implements OnInit, OnDestroy
{
  constructor(
    currencyPipe: CustomCurrencyPipe,
    elementRef: ElementRef,
    control: NgControl,
    profile: ProfileService
  ) {
    super(currencyPipe, elementRef, control, profile);
  }
}
