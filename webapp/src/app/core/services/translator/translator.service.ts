import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty, upperFirst } from 'lodash';
import { Observable, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ComboboxItem } from '@app/core/api';
import { Globals } from '@app/core/global/globals';
import { environment } from '@env/environment';
import { PrimeNGConfig } from 'primeng/api';

const LOCALE_ID = `${environment.prefix}_locale_id`;
/**
 * A service that provides translation functionalities for various parts of the application.
 *
 * This service includes methods to translate fields, dynamic values, messages, PrimeNG component labels,
 * enumeration values, and initializes the user's language settings.
 *
 * This class should not be modified directly. You can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyTranslatorService extends TranslatorService {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: TranslatorService, useClass: MyTranslatorService }
 * ];
 * ```
 * */
@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  MENU_ITEMS = 'Menu Items.';
  LABELS = 'Labels.';
  translate = inject(TranslateService);
  config = inject(PrimeNGConfig);
  globas = inject(Globals);

  /**
   * Translates the fields
   * @param modelName
   * @param fieldName
   * @returns {string}
   */
  translateField(modelName, fieldName) {
    if (fieldName) {
      this.translate.get('Definitions.' + modelName + '.' + fieldName).subscribe((res) => {
        fieldName = !res?.includes('Definitions.') ? res : '';
      });
      return fieldName;
    }
    return '';
  }
  /**
   * Translates dynamic values such as inline labels
   * @param value
   * @param key
   * @returns {Observable}
   */
  getDynamicValues(value, key) {
    return this.translate.get(`DynamicValues.${key}.${value}`);
  }
  /**
   * Translates the messages
   * @param message
   * @returns {Observable}
   */
  getMessage(message: string, args?: any) {
    return this.translate
      .get('Messages.' + message, args || null)
      .pipe(map((res: string) => (!res?.includes('Messages.') ? res : message)));
  }
  /**
   * Translates the primeng components' labels
   * @param message
   * @returns {Observable}
   */
  getPrimengLabel(message: string, args?: any) {
    let result = message;
    this.translate
      .get('Primeng.' + message, args || null)
      .pipe(filter((data) => !isEmpty(data)))
      .subscribe((res: string) => (!res?.includes('Primeng.') ? (result = res) : message));
    return result;
  }
  /**
   * Translates the enumeration values
   * @param value
   * @param enumerationName
   * @returns {string}
   */
  translateEnumItem(value: any, enumerationName: any): string {
    if (value !== undefined && value !== null) {
      this.translate.get('Enumeration.' + enumerationName + '.' + value).subscribe((res) => {
        value = !res?.includes('Enumeration.') ? res : value;
      });
      return value;
    }
    return '';
  }
  /**
   * Tanslates the possible value
   * @param enumPossibleValuesList
   * @param enumerationName
   * @param item
   */
  translateEnumItems(
    fieldsPossibleValuesList: ComboboxItem[],
    enumerationName: string,
    item: string
  ) {
    this.translate.get('Enumeration.' + enumerationName + '.' + item).subscribe((res) => {
      const translateItem = !res?.includes('Enumeration.') ? res : upperFirst(item);
      fieldsPossibleValuesList.push({ label: translateItem, value: item });
    });
  }
  /**
   * Loads the enumeration's possible values
   * @param enumPossibleValuesList
   * @param enumeration
   * @param enumName
   * @returns {array}
   */
  loadEnumeration(enumPossibleValues, enumeration, enumName) {
    return Object.values(enumeration)
      .filter((item) => typeof item === 'string')
      .map((item) => this.translateEnumItems(enumPossibleValues, enumName, item.toString()));
  }
  /**
   * Loads the enumeration's possible values
   * @param enumeration
   * @param enumName
   * @returns {array}
   */
  enumValues(enumeration, enumName): Observable<any> {
    return zip(
      ...Object.values(enumeration)
        .filter((item) => typeof item === 'string')
        .map((item) => {
          return this.translate.get('Enumeration.' + enumName + '.' + item).pipe(
            map((res) => {
              const translateItem = !res?.includes('Enumeration.')
                ? res
                : upperFirst(item.toString());
              return {
                label: upperFirst(translateItem),
                value: item,
              };
            })
          );
        })
    );
  }
  /**
   * Inits the user 'slanguage
   */
  initLanguage() {
    const lang = localStorage.getItem(LOCALE_ID) || document.documentElement.lang || 'en';
    this.translate.use(lang);
    this.translate.get('Primeng').subscribe((res) => this.config.setTranslation(res));
    localStorage.setItem(LOCALE_ID, lang);
  }
  /**
   * Redirect to user language on login
   */
  applyPreferredLanguage() {
    const allowedLanguages = this.globas.languages;

    // Get the current language from localStorage, or default to 'en'
    let currentLang = localStorage.getItem(LOCALE_ID) || document.documentElement.lang || 'en';
    const documentLang = document.documentElement.lang;

    // Validate the current language against allowed languages
    if (!allowedLanguages.includes(currentLang)) {
      currentLang = 'en'; // Default to English if invalid
    }

    if (currentLang !== documentLang) {
      let baseUrl = this.getCleanedBaseUrl(document.head.baseURI, allowedLanguages);
      const validUrls = allowedLanguages.map((lang) => `${baseUrl}${lang}/`);
      baseUrl = `${baseUrl}${currentLang}/`;
      if (validUrls.includes(baseUrl)) {
        window.location.replace(baseUrl);
      }
    }
  }

  /**
   * Removes the language segment from the given URL if it matches any of the provided languages.
   *
   * @param url - The URL string to be cleaned.
   * @param languages - An array of language codes to be matched and removed from the URL.
   * @returns The cleaned URL string with the language segment removed, or `null` if no match is found.
   */
  getCleanedBaseUrl(url: string, languages: string[]): string | null {
    // Match and remove the language segment from the URL
    const languageRegex = new RegExp(`\\/(${languages.join('|')})\\/?$`, 'i');
    return url.replace(languageRegex, '/');
  }
}
