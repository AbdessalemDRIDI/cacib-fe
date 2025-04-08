import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgControl } from '@angular/forms';
import { ProfileService } from '@app/core/services/profile/profile.service';
import { environment } from '@env/environment';
import { NumberPipe } from '../pipes/number.pipe';
import { NumberFormatterDirective } from './number.directive';
const LOCALE_ID = `${environment.prefix}_locale_id`;
@Component({
  template: `<input class="number" type="text" plmNumberFormatter [value]="1000" />`,
  standalone: true,
  imports: [TestNumberComponent, NumberFormatterDirective, NumberPipe],
})
class TestNumberComponent {}

describe('Directive: NumberFormatterDirective', () => {
  let fixture: ComponentFixture<TestNumberComponent>;
  let inputEl: DebugElement;
  let numberPipe;
  beforeEach(() => {
    localStorage.setItem(LOCALE_ID, 'en');
    TestBed.configureTestingModule({
      imports: [TestNumberComponent, NumberFormatterDirective, NumberPipe],
      providers: [
        NumberPipe,
        DecimalPipe,
        ProfileService,
        { provide: HttpClient, useValue: {} },
        { provide: NgControl, useValue: { control: { value: 500, setValue: () => {} } } },
      ],
    });
    fixture = TestBed.createComponent(TestNumberComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    numberPipe = TestBed.inject(NumberPipe);
  });

  describe('focus event', () => {
    it('should set the value from the control', () => {
      inputEl.triggerEventHandler('focus', { target: { value: null } });
      fixture.detectChanges();
      expect(inputEl.nativeElement.value).toBe('1,000');
    });
  });

  describe('blur event', () => {
    it('should apply the currency pipe', () => {
      spyOn(numberPipe, 'transform').and.returnValue('2,000');
      inputEl.triggerEventHandler('blur', { target: { value: 2000 } });
      fixture.detectChanges();
      expect(inputEl.nativeElement.value).toBe('2,000');
    });
  });
});
