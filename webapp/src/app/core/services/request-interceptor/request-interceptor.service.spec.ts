import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoaderService } from '@app/core/components/loaders/services/loader.service';
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { MessagesService } from '@services/messages/message.service';
import { RequestInterceptorService } from './request-interceptor.service';

describe('RequestInterceptorService', () => {
  let service: RequestInterceptorService;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let authService: jasmine.SpyObj<AuthManagerService>;
  let messageService: jasmine.SpyObj<MessagesService>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    const loaderSpy = jasmine.createSpyObj('LoaderService', ['show', 'hide']);
    const authSpy = jasmine.createSpyObj('AuthManagerService', ['doLogout']);
    const messageSpy = jasmine.createSpyObj('MessagesService', ['showException']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RequestInterceptorService,
        { provide: LoaderService, useValue: loaderSpy },
        { provide: AuthManagerService, useValue: authSpy },
        { provide: MessagesService, useValue: messageSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptorService,
          multi: true,
        },
        { provide: Router, useValue: { navigate: () => {} } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(RequestInterceptorService);
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    authService = TestBed.inject(AuthManagerService) as jasmine.SpyObj<AuthManagerService>;
    messageService = TestBed.inject(MessagesService) as jasmine.SpyObj<MessagesService>;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add cache control header', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(loaderService.show).toHaveBeenCalled();

    req.flush({ data: 'test' });
    expect(req.request.headers.has('Accept: "*/*'));
    expect(req.request.headers.has('Cache-control'));
    expect(req.request.headers.has('Expires'));
    expect(req.request.headers.has('Pragma'));
    expect(loaderService.hide).toHaveBeenCalled();
  });
});
