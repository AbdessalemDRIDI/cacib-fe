import { HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * HTTP URL encoding.
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: HttpUrlEncodingCodec, useClass: MyHttpUrlEncodingCodec }
 * ];
 * ```
 * */
@Injectable({
  providedIn: 'root',
})
export class HttpUrlEncodingCodec implements HttpParameterCodec {
  /**
   * Encodes the provided key
   * @param key
   * @returns {string}
   */
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  /**
   * Decodes the provided key
   * @param key
   * @returns {string}
   */
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  /**
   * Encodes the provided value
   * @param key
   * @returns {string}
   */
  encodeValue(value: string): string {
    return this.encodeKey(value);
  }

  /**
   * Decodes the provided value
   * @param key
   * @returns {string}
   */
  decodeValue(value: string) {
    return this.decodeKey(value);
  }
}
