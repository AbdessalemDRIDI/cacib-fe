import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get, invert, isEmpty } from 'lodash';
import { Subject } from 'rxjs';

import { TranslatorService } from '@services/translator/translator.service';

import { MessageOptions, MessageType } from '@core/components/messages/models/message.options';
/**
 * The MessagesService is responsible for displaying messages of various types: `error`, `info`, `warn`, `success`, or `confirmation`.
 * The messages can be static or provided in the REST JSON response. Please refer to our documentation for more information about the binding configurations of your REST responses' messages:
 * https://wiki.vermeg.com/display/PFD/Workspace+Properties#WorkspaceProperties-F6
 *
 * This class should not be modified directly. You can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyMessageService extends MessagesService {
 *   ...
 *   customizeMessage(result: any, message: string) {
 *     return message;
 *   }
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: MessagesService, useClass: MyMessageService }
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  /**
   * The Subject variable of the messages
   */
  messageSubject = new Subject<MessageOptions>();
  /**
   * The Observable of the messages
   */
  messageState = this.messageSubject.asObservable();
  /**
   * The messages' binding parameters
   */
  messageOptions: MessageOptions;
  private messageSchema = {
    title: 'title',
    summary: 'description',
    type: 'messageType',
    code: 'code',
    jsonProperty: 'messages',
  };
  private messageTypesDefinitions = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success',
  };
  /**
   * Default constructor
   */
  constructor(private translatorService: TranslatorService) {}
  /**
   * Displays the exception message
   * @param {HttpErrorResponse} err - The http error response
   * @return {void}
   */
  showException(err: HttpErrorResponse): void {
    this.showErrorHttpMessages(
      isEmpty(err.error) || typeof err.error === 'string' ? err : err.error
    );
  }
  /**
   * Displays messages provided in the JSON response
   * HttpStatus: 200
   * @param {object} response - The response object
   * @param {string} jsonProperty - The property key to get the data from the response
   * @param {string} messageType - The message type : Info, Error ...
   * @return {void}
   */
  showHttpMessages(
    response: any,
    jsonProperty: string = this.messageSchema.jsonProperty,
    messageType: string = 'success'
  ): void {
    const responseData = get(response, jsonProperty);
    if (responseData) {
      this.showMessages(responseData, messageType);
    }
  }
  /**
   * Displays error messages provided in the JSON response
   * HttpStatus: 500
   * @param {object} response - The response object
   * @param {string} jsonProperty - The property key to get the data from the response
   * @param {string} messageType - The message type : Info, Error ...
   * @return {void}
   */
  showErrorHttpMessages(
    response: any,
    jsonProperty: string = this.messageSchema.jsonProperty,
    defaultType: string = 'error'
  ): void {
    this.showMessages(get(response, jsonProperty, response), defaultType);
  }
  /**
   * Displays messages from the provided JSON data
   * @param {object} response - The response object
   * @param {string} defaultType - The message type : Info, Error ...
   * @return {void}
   */
  private showMessages(response: any, defaultType: string) {
    let messages = new Array<any>();
    Array.isArray(response) ? (messages = messages.concat(response)) : messages.push(response);
    messages.forEach((result) => {
      const title = get(result, this.messageSchema.title);
      const message = get(
        result,
        this.messageSchema.summary,
        result.description ? result.description : result.message
      );
      const finalMessage = this.customizeMessage(result, message);
      const customType = get(result, this.messageSchema.type, defaultType);
      const mode = get(invert(this.messageTypesDefinitions), customType, defaultType);
      const code = get(result, this.messageSchema.code);
      this.showMessage({
        message: finalMessage,
        mode,
        title,
      });
    });
  }
  /**
   * Override this method to customize the default message using your own
   * Message service
   */
  customizeMessage(result: any, message: string) {
    return message;
  }
  /**
   * Displays message based on the message type
   * @param {string} content - The message content
   * @param {MessageType} messageType - The message type : Info, Error ...
   * @return {void}
   */
  public openMessage(content: string, messageType: MessageType): void {
    this.showMessage({
      message: content,
      mode: messageType,
      title: messageType,
    });
  }
  /**
   * Displays a success message
   * @param {string} content - The message content
   * @return {void}
   */
  public openSuccessMessage(content: string): void {
    this.showMessage({
      message: content,
      title: 'Success',
      mode: 'success',
    });
  }
  /**
   * Displays an error message
   * @param {string} content - The message content
   * @return {void}
   */
  public openErrorMessage(content: string): void {
    this.showMessage({
      message: content,
      mode: 'error',
      title: 'Error',
      duration: 2000,
    });
  }
  /**
   * Displays a warning message
   * @param {string} content - The message content
   * @return {void}
   */
  public openWarningMessage(content: string): void {
    this.showMessage({
      message: content,
      mode: 'warn',
      title: 'Warning',
    });
  }
  /**
   * Displays an info message
   * @param {string} content - The message content
   * @return {void}
   */
  public openInfoMessage(content: string): void {
    this.showMessage({
      message: content,
      mode: 'info',
      title: 'Information',
    });
  }
  /**
   * Displays any kind of message
   * @param {MessageOptions} message - The messageOptions describing the message
   * @return {void}
   */
  show(message: string, mode: string): void {
    this.showMessage({
      message,
      mode,
      title: mode,
    });
  }
  /**
   * Displays any kind message
   * @param {MessageOptions} message - The messageOptions describing the message
   * @return {void}
   */
  showMessage(message?: MessageOptions): void {
    this.translatorService.getMessage(message.message).subscribe((res) => {
      message.message = res;
      this.messageSubject.next(message);
    });
  }
  /**
   * Hides a message
   * @return {void}
   */
  hideMessage(): void {
    this.messageSubject.next({ message: 'close' });
  }
}
