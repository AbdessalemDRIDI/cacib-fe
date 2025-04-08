import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordComponent } from '@app/core/components/change-password/change-password.component';
import { LoaderMaskComponent } from '@app/core/components/loaders/loader-mask/loader-mask.component';
import { LoaderService } from '@app/core/components/loaders/services/loader.service';
import { LogoComponent } from '@app/core/components/logo/logo.component';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { Observable, ReplaySubject, of } from 'rxjs';
import { LoginComponent } from './login.component';

class MockAuthenticationService {
  brandSubject = new ReplaySubject<string>();
  authenticateUser(user: any): Observable<any> {
    return of(user);
  }
  isLogged(): boolean {
    return false;
  }
  loading() {
    return false;
  }
  errorMessage() {
    return false;
  }
}
class MockTranslatorService {
  getMessage(value: any): Observable<any> {
    return of({});
  }
}

let router = {
  navigate: jasmine.createSpy('navigate'),
};

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoaderService;

  beforeEach(waitForAsync(() => {
    mockLoaderService = jasmine.createSpyObj('mockLoaderService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManagerService, useClass: MockAuthenticationService },
        { provide: Router, useValue: {} },
        { provide: Router, useValue: router },
        { provide: TranslatorService, useClass: MockTranslatorService },
        { provide: LoaderService, useValue: mockLoaderService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                redirect_uri: 'https://live.veggoplatform.com',
              },
            },
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LogoComponent,
        LoginComponent,
        LoaderMaskComponent,
        ChangePasswordComponent,
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'changePassword').and.callThrough();
  });

  it('should create a form having username and password as controls', () => {
    expect(Object.keys(component.form.controls)[0]).toEqual('username');
    expect(Object.keys(component.form.controls)[1]).toEqual('password');
  });
  it('should create a form having username and password as empty controls', () => {
    expect(component.form.get('username').value).toEqual('');
    expect(component.form.get('password').value).toEqual('');
  });

  it(`should return Succes Reset`, () => {
    expect(component.onResetSuccess('')).toBe(undefined);
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();
    const dataUser = {
      username: 'test',
      password: '123456789',
    };
    component.form.patchValue(dataUser);
    expect(component.form.valid).toBeTruthy();
    component.onSubmit();
  });
});
