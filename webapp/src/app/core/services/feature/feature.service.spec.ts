import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProfileService } from '../profile/profile.service';
import { TranslatorService } from '../translator/translator.service';
import { FeatureService } from './feature.service';

function verifyForm(form: UntypedFormGroup): void {
  (<any>Object).values(form.controls).forEach((control: UntypedFormControl) => {
    if (control instanceof UntypedFormGroup) {
      verifyForm(control);
    } else {
      expect(control.touched).toBeTruthy();
    }
  });
}
describe('FeatureService', () => {
  let service: FeatureService;
  let mockFormBuilder,
    mockProfileService,
    mockTranslatorService,
    mockactivatedRoute,
    mockRouter,
    navigateFnMock;
  beforeEach(() => {
    mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['']);
    mockProfileService = jasmine.createSpyObj('mockProfileService', ['']);
    mockTranslatorService = jasmine.createSpyObj('mockTranslatorService', ['']);
    mockactivatedRoute = jasmine.createSpyObj('mockactivatedRoute', ['queryParams']);
    mockactivatedRoute.queryParams.subscribe = jasmine
      .createSpy('subscribe')
      .and.returnValue(of({}));
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: UntypedFormBuilder, useValue: mockFormBuilder },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockactivatedRoute },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: TranslatorService, useValue: mockTranslatorService },
        FeatureService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(FeatureService);
  });
  describe('get profileService', () => {
    it('should return the profile service', () => {
      expect(service.profileService).toEqual(mockProfileService);
    });
  });
  describe('get translatorService', () => {
    it('should return the translator service', () => {
      expect(service.translatorService).toEqual(mockTranslatorService);
    });
  });
  describe('get formBuilder', () => {
    it('should return the formBuilder', () => {
      expect(service.formBuilder).toEqual(mockFormBuilder);
    });
  });

  describe('#navigate', () => {
    it('should navigate to the target screen', () => {
      const mockActivateRoute = jasmine.createSpyObj('mockActivateRoute', ['navigate']);
      mockactivatedRoute.navigate = jasmine
        .createSpy('navigate')
        .and.returnValue({ then: () => {} });
      mockRouter.navigate = jasmine.createSpy('navigate').and.returnValue({ then: () => {} });
      service['router'] = mockActivateRoute;
      const params =
        '{"feature":"product","screenType":"Edit","screenId":"1dq2dseir","roleName":"productType","rootId":"1dq2dseir"}';
      //   service.navigate(
      //     'product',
      //     'searchInput',
      //     'call',
      //     null,
      //     mockActivateRoute
      //   )
      //expect(mockActivateRoute.navigate).toHaveBeenCalled()
    });
  });
});
