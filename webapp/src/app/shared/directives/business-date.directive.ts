import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Host,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { BusinessDateBaseDirective } from './business-date-base.directive';
/*
 * You can override the BusinessDate directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 * */
@Directive({
  selector: '[businessDate]',
  standalone: true,
})
export class BusinessDateDirective extends BusinessDateBaseDirective implements AfterViewInit {
  @Output() businessDate = new EventEmitter<any>();

  constructor(@Host() @Self() @Optional() public host: Calendar) {
    super(host);
  }
}
