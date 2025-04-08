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

@Directive()
export class BusinessDateBaseDirective implements AfterViewInit {
  @Output() businessDate = new EventEmitter<any>();

  constructor(@Host() @Self() @Optional() public host: Calendar) {
    // the original primeng UpdateModel function
    const oldUpdateModel = host.updateModel;
    /**
     * Define a function to transform a value to UTC time
     * @param value
     * @returns
     */
    const transformValue = (value: any): any => {
      // In case of fromToDate component transform each element of the array to UTC time
      if (value instanceof Array) {
        return value.map((el) => transformDate(el));
      } else {
        return transformDate(value);
      }
    };

    const transformDate = (date: any): any => {
      if (!date) {
        return null;
      }
      const jsDate = new Date(date);
      if (isNaN(jsDate.getTime())) {
        // Invalid date handling
        return null;
      }
      const offset = jsDate.getTimezoneOffset();
      const isUtcNegative = offset < 0;
      const utcDate = new Date(jsDate.getTime() + offset * 60000);
      if (!isUtcNegative) {
        utcDate.setTime(utcDate.getTime() + offset * 60000);
      }
      return utcDate;
    };
    //override update model function
    host.updateModel = function (value) {
      if (!value) {
        this.value = null;
      } else {
        this.value = transformValue(value);
      }
      oldUpdateModel.call(host, this.value);
    }.bind(host);
  }
  ngAfterViewInit(): void {
    this.host.value && this.host.updateModel(this.host.value);
  }
}
