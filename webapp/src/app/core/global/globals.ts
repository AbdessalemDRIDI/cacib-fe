import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Injectable } from '@angular/core';
/**
 * The base parameters service that provides the configured languages
 */
@Injectable()
export class Globals {
  /**
   * The supported languages
   */
  languages: string[] = ['en'];

  constructor() {
    this.initializeLanguage();
  }
  /**
   *
   * Initializes the language (en-US , fr-FR)
   * Default language is navigator.language:en-US
   * @returns {string}
   *
   */
  public initializeLanguage() {
    registerLocaleData(en);
  }
}
