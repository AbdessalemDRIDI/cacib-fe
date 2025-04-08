import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProfileService } from '@app/core/services/profile/profile.service';
import { environment } from '@env/environment';
import { NumberPipe } from './number.pipe';

const LOCALE_ID = `${environment.prefix}_locale_id`;

@Component({
  template: `<div>{{ value | numberPipe }}</div>`,
  standalone: true,
  imports: [NumberPipe],
})
class TestNumberPipeComponent {
  value;
}

describe('Number Pipe', () => {
  let fixture: ComponentFixture<TestNumberPipeComponent>;
  let component: TestNumberPipeComponent;
  let divElement: Element;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestNumberPipeComponent, NumberPipe],
      providers: [DecimalPipe, ProfileService, { provide: HttpClient, useValue: {} }],
    });
    fixture = TestBed.createComponent(TestNumberPipeComponent);
    component = fixture.componentInstance;
    divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    localStorage.setItem(LOCALE_ID, 'en');
  });

  it('should return an empty string in case of null value', () => {
    fixture.detectChanges();
    expect(divElement.textContent.trim()).toBe('');
  });

  it('should return the formatted value', () => {
    component.value = 2000500;
    fixture.detectChanges();
    expect(divElement.textContent.trim()).toBe('2,000,500');
  });

  describe(' return the formatted value when valid number is provided', () => {
    let numberPipe: NumberPipe;
    let profileService: ProfileService;
    beforeEach(waitForAsync(() => {
      profileService = TestBed.get(ProfileService);
      numberPipe = new NumberPipe(new DecimalPipe('fr'), profileService);
    }));

    it('should return the formatted value ', function () {
      expect(numberPipe.transform(45, undefined, undefined, undefined, undefined)).toBe('45');
    });
    it('should return the formatted value when useDecimals is true ', function () {
      expect(numberPipe.transform(1, true, '', '', 'left')).toBe('1');
    });
    it('should return the formatted value when symbol is provided ', function () {
      expect(numberPipe.transform(20, true, '$', '0', 'left')).toBe('$20');
    });
    it('should count decimals ', function () {
      expect(numberPipe.countDecimals(45)).toBe(0);
    });
  });
});
