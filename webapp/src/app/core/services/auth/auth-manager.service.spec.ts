import {
  HttpClient,
  HttpParams,
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { JwtHelperService } from '@services/auth-impl/jwthelper.service';
import { AuthManagerService } from '@services/auth/auth-manager.service';

const fakeActivatedRoute = {
  snapshot: { data: {} },
} as ActivatedRoute;

describe('Service: AuthManager', () => {
  const SERVICE_PATH = `${environment.basePath}/security/authenticate`;
  const mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
  const mockJwtHelper = jasmine.createSpyObj('mcokjwtHelper', ['']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        AuthManagerService,
        HttpClient,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: JwtHelperService,
          useValue: mockJwtHelper,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });
  it(`should send an expected login request`, waitForAsync(
    inject(
      [AuthManagerService, HttpTestingController],
      (service: AuthManagerService, backend: HttpTestingController) => {
        service.authenticateUser({ username: 'foo', password: 'bar' });

        backend.expectOne((req: HttpRequest<any>) => {
          const body = new HttpParams({ fromString: req.body });
          return req.url === SERVICE_PATH && req.method === 'POST';
        }, `POST '${SERVICE_PATH}' with form-encoded username and password`);
      }
    )
  ));
  // Verifying that no requests remain outstanding
  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));
});
