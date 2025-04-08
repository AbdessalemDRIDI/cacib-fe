import { APP_BASE_HREF } from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { ReplaySubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { BrandingComponent } from './core/components/branding/branding.component';
import { LoaderMaskComponent } from './core/components/loaders/loader-mask/loader-mask.component';
import { LoaderService } from './core/components/loaders/services/loader.service';
import { AuthManagerService } from './core/services/auth/auth-manager.service';
import { TranslatorService } from './core/services/translator/translator.service';
class MockAuthenticationService {
  brandSubject = new ReplaySubject<string>();
}
describe('Main: AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), LoaderMaskComponent, BrandingComponent, AppComponent],
      providers: [
        { provide: AuthManagerService, useClass: MockAuthenticationService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: Router, useValue: { events: of(new NavigationStart(1, '/login')) } },
        { provide: TranslatorService, useValue: { initLanguage: () => {} } },
        LoaderService,
      ],
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
