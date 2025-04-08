import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProfileService } from '@app/core/services/profile/profile.service';
import { environment } from '@env/environment';
import { CustomCurrencyPipe } from './currency.pipe';

const LOCALE_ID = `${environment.prefix}_locale_id`;

@Component({
  template: `<div class="dollar-currency">{{ value | currencyPipe }}</div>
    <div class="euro-currency">{{ value | currencyPipe: '£' }}</div>`,
  standalone: true,
  imports: [CustomCurrencyPipe],
})
class TestCurrencyPipeComponent {
  value;
}

describe('CurrencyPipe', () => {
  let fixture: ComponentFixture<TestCurrencyPipeComponent>;
  let component: TestCurrencyPipeComponent;
  let dollarCurrencyElement, euroCurrencyElement: Element;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestCurrencyPipeComponent, CustomCurrencyPipe],
      providers: [CurrencyPipe, ProfileService, { provide: HttpClient, useValue: {} }],
    });
    fixture = TestBed.createComponent(TestCurrencyPipeComponent);
    component = fixture.componentInstance;
    dollarCurrencyElement = fixture.debugElement.query(By.css('.dollar-currency')).nativeElement;
    euroCurrencyElement = fixture.debugElement.query(By.css('.euro-currency')).nativeElement;
    localStorage.setItem(LOCALE_ID, 'en');
  });

  it('should return an empty string in case of null value', () => {
    fixture.detectChanges();
    expect(dollarCurrencyElement.textContent.trim()).toBe('');
  });

  it('should return the formatted value with default currency code', () => {
    component.value = 1500;
    fixture.detectChanges();
    expect(dollarCurrencyElement.textContent.trim()).toBe('$1,500');
  });
  it('should return the formatted value using the provided currency code', () => {
    component.value = 2500;
    fixture.detectChanges();
    expect(euroCurrencyElement.textContent.trim()).toBe('2,500');
  });

  describe('#transform ', () => {
    it('should return the correctly formatted value', () => {
      let currencyPipeService: CurrencyPipe = TestBed.get(CurrencyPipe);
      let profileService: ProfileService = TestBed.get(ProfileService);
      let pipe = new CustomCurrencyPipe(currencyPipeService, profileService);
      expect(pipe.transform('', '', '', '')).toBe(null);
      expect(pipe.transform(2500, '', '', '')).toBe('2,500');
      expect(pipe.transform(2500, '', '', 'symbol')).toBe('$2,500');
      expect(pipe.transform(2500, '', '', 'code')).toBe('USD2,500');
      expect(pipe.transform(2500, 'EUR', '', 'code')).toBe('EUR2,500');
      expect(pipe.transform(2500, 'EUR', '', 'symbol')).toBe('€2,500');
    });
  });
});
