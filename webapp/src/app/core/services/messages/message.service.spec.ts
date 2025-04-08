import { of } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from './message.service';

describe('Service: MessagesService', () => {
  let service: MessagesService;
  let messageOptions;
  let mockedTranslatorService;
  beforeEach(() => {
    messageOptions = {
      title: 'Message Title',
      message: 'Lorem Ipsum Message',
      mode: 'info',
      duration: 1000,
    };
    mockedTranslatorService = jasmine.createSpyObj('mockedTranslatorService', ['getMessage']);
    mockedTranslatorService.getMessage.and.returnValue(of(messageOptions.message));
    service = new MessagesService(mockedTranslatorService);
  });

  it('should emit the message object to Subject state', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.title).toBe(messageOptions.mode.toUpperCase());
      expect(value.message).toBe(messageOptions.message);
      expect(value.mode).toBe(messageOptions.mode);
      done();
    });
    messageOptions.mode = 'ERROR';
    service.show(messageOptions.message, messageOptions.mode);
  });

  it('should show the message', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.title).toBe(messageOptions.title);
      expect(value.message).toBe(messageOptions.message);
      done();
    });
    service.showMessage(messageOptions);
  });

  it('should emit the error message to Subject state', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.mode).toBe('error');
      done();
    });
    service.openErrorMessage(messageOptions.message);
  });

  it('should emit the info message to Subject state', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.mode).toBe('info');
      done();
    });
    service.openInfoMessage(messageOptions.message);
  });

  it('should emit the success message to Subject state', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.mode).toBe('success');
      done();
    });
    service.openSuccessMessage(messageOptions.message);
  });

  it('should emit the warning message to Subject state', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.title).toBe('Warning');
      done();
    });
    service.openWarningMessage(messageOptions.message);
  });
  it('should emit the message object to Subject state and take the messageType into consideration', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.title).toBe(messageOptions.title);
      expect(value.message).toBe(messageOptions.message);
      expect(value.mode).toBe(messageOptions.mode);
      done();
    });
    messageOptions.mode = 'success';
    messageOptions.title = 'success';

    service.openMessage(messageOptions.message, messageOptions.mode);
  });

  it('should emit the close message to Subject state', (done) => {
    service.messageState.subscribe((value) => {
      expect(value.message).toBe('close');
      done();
    });
    service.hideMessage();
  });

  it('should show the exception message with an empty response', (done) => {
    expect(service.showException(new HttpErrorResponse({}))).toBe(undefined);
    done();
  });
  it('should show the exception message with string error', (done) => {
    expect(service.showException(new HttpErrorResponse({ error: 'an error' }))).toBe(undefined);
    done();
  });
  it('should show the exception message with object error', (done) => {
    expect(service.showException(new HttpErrorResponse({ error: { message: 'an error' } }))).toBe(
      undefined
    );
    done();
  });
  it('should show the http message with an empty response', (done) => {
    expect(service.showHttpMessages({}, 'data', 'error')).toBe(undefined);
    done();
  });
  it('should show the http message', (done) => {
    expect(
      service.showHttpMessages({ message: 'an error occur', code: 405 }, 'message', 'success')
    ).toBe(undefined);
    done();
  });
});
