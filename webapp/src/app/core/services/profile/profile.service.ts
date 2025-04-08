import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { DatePrecision, DateType } from '@app/core/utils';
import { environment } from '@env/environment';
import { HttpUrlEncodingCodec } from './../auth/encoder';
import { Profile } from './profile.model';
const LOCALE_ID = `${environment.prefix}_locale_id`;
const PROFILE = `${environment.prefix}_profile`;
const BASE_PATH = environment.basePath;
/**
 * A service that provides the user's profile information such as language, formatting options, date and time formats, etc.
 *
 * This service should not be modified directly. You can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyProfileService extends ProfileService {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 *  providers: [
 *   { provide: ProfileService, useClass: MyProfileService }
 *  ]
 * ```
 * */
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  /**
   * The current profile variable
   */
  private currentProfile: Profile;

  constructor(
    private http: HttpClient,
    private encoder: HttpUrlEncodingCodec
  ) {}

  /**
   * Gets the user profile from the LocalStorage if exists, else
   * returns the `default one`
   * @returns { Profile }
   */
  getProfileFromLocalStorage(): Profile {
    if (!this.currentProfile) {
      const profile = localStorage.getItem(PROFILE);
      return (this.currentProfile = profile ? JSON.parse(profile) : this.getDefault());
    }
    return this.currentProfile;
  }
  /**
   * Gets the user's profile
   * @returns {Profile}
   */
  getProfile(): Profile {
    return this.getProfileFromLocalStorage();
  }
  /**
   * Returns the current profile
   * @returns {Profile}
   */
  getCurrentProfile(): Profile {
    return this.getProfileFromLocalStorage();
  }
  /**
   * Gets the current language : en,fr..
   * @returns {string}
   */
  getCurrentLanguage(): string {
    return this.getCurrentProfile().language;
  }
  /**
   * Gets the current number format
   * @returns {string}
   *
   */
  getCurrentNumberFormat(): string {
    return this.getCurrentProfile().numberFormat;
  }
  /**
   * Gets the number format according to the precision
   * @param {precision}
   * @returns {string}
   */
  getNumberFormat(precision: number): string {
    return this.getCurrentProfile().numberFormat;
  }
  /**
   * Returns the decimal symbol
   * @returns {string}
   */
  getDecimalSymbol(): string {
    return this.getCurrentProfile().decimalSymbol
      ? this.getCurrentProfile().decimalSymbol
      : this.getNumberSymbol(NumberSymbol.CurrencyDecimal);
  }
  /**
   * Returns the decimal symbol
   * @returns {string}
   */
  getGroupingSymbol(): string {
    return this.getCurrentProfile().groupingSymbol
      ? this.getCurrentProfile().groupingSymbol
      : this.getNumberSymbol(NumberSymbol.CurrencyGroup);
  }
  /**
   * Gets the symbol from the the locale
   * @param {symbol}
   * @returns {string}
   */
  private getNumberSymbol(symbol: NumberSymbol) {
    return getLocaleNumberSymbol(this.getLocale(), symbol);
  }
  /**
   * Gets the current date format
   * @returns {string}
   */
  getCurrentDateFormat(): string {
    return this.getCurrentProfile().dateFormat;
  }

  /**
   * Returns the date format according to the type and the precision
   * @param {temporalType}
   * @param {datePrecision}
   * @returns {string}
   */
  getDateFormat(temporalType: string, datePrecision?: string): string {
    switch (temporalType) {
      case DateType.TIME_STAMP:
        return DatePrecision.getFormatAccordingToPrecisions(
          this.getCurrentTimeStampFormat(),
          datePrecision
        );

      case DateType.TIME:
        return DatePrecision.getFormatAccordingToPrecisions(
          this.getCurrentTimeFormat(),
          datePrecision
        );

      case DateType.DATE:
        return DatePrecision.getFormatAccordingToPrecisions(
          this.getCurrentDateFormat(),
          datePrecision
        );

      default:
        return this.getCurrentDateFormat();
    }
  }

  /**
   * Gets the current time format
   * @returns {string}
   */
  getCurrentTimeFormat(): string {
    return this.getCurrentProfile().timeFormat;
  }
  /**
   * Gets the timeFormat according to the precision
   * @returns {string}
   */
  getTimeFormat(precision: string): string {
    return DatePrecision.getFormatAccordingToPrecisions(this.getCurrentTimeFormat(), precision);
  }
  /**
   * Gets the current TimeStampFormat (Date + Time)
   * @returns {string}
   */
  getCurrentTimeStampFormat(): string {
    return this.getCurrentProfile()
      ? this.getCurrentProfile().dateFormat + ' ' + this.getCurrentProfile().timeFormat
      : null;
  }
  /**
   * Gets the locale according to the profile's language
   * @returns {string}
   */
  getLocale(): string {
    return localStorage.getItem(LOCALE_ID);
  }
  /**
   * Gets the digits info
   * @returns {string}
   */
  getDigitsInfo(decimalDigit?: string, minFractionDigits = 0): string {
    const decimalDigitValue =
      decimalDigit && isNaN(parseFloat(decimalDigit)) ? undefined : parseFloat(decimalDigit);
    const numberFormat = this.getCurrentNumberFormat();
    let digitsInfo;
    if (numberFormat) {
      const format = numberFormat.split(';').shift();
      const minIntegerDigits = 1;
      const maxFractionDigits = format
        ? decimalDigitValue
          ? decimalDigitValue
          : format.length - format.indexOf(this.getDecimalSymbol()) - 1
        : 3;
      digitsInfo = minIntegerDigits + '.' + minFractionDigits + '-' + maxFractionDigits;
    }
    return digitsInfo;
  }
  /**
   * Gets the default profile
   * @return {Object}
   */
  getDefault() {
    return {
      language: 'en',
      numberFormat: '#,##0.###',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm:ss:SSS',
      decimalSymbol: '.',
      groupingSymbol: ',',
    };
  }
  /**
   * Gets the user's profile by language
   * @returns { Observable<Profile> }
   */
  get(language?: string): Observable<Profile> {
    let params = new HttpParams();
    if (language) {
      params = params.append('language', this.encoder.encodeValue(language));
    }
    return this.http.get<Profile>(`${BASE_PATH}/presentationProfilesController/currentProfile`, {
      params: params,
    });
  }
}
