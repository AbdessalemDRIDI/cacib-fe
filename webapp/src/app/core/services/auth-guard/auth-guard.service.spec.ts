import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuardService } from '@services/auth-guard/auth-guard.service';

describe('Service: AuthGuard', () => {
  let mockMessageService: any,
    mockInjector: any,
    authGuardService,
    mockRouter,
    mockCustomerPolicyService,
    mockAuthManagerService,
    mockMenuService;
  let next = { data: {} };

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('router', ['state', 'navigateByUrl']);
    mockInjector = jasmine.createSpyObj('injector', ['get']);
    mockCustomerPolicyService = jasmine.createSpyObj('CustomerPolicyService', [
      'isScreenAuthorized',
    ]);
    mockMessageService = jasmine.createSpyObj('mockMessageService', ['openErrorMessage']);
    mockAuthManagerService = jasmine.createSpyObj('mockAuthManagerService', [
      'isLogged',
      'doLogout',
    ]);
    mockMenuService = jasmine.createSpyObj('MenuService', ['getUnfiltredMenu', 'getFiltredMenu']);
    authGuardService = new AuthGuardService(
      mockRouter,
      mockInjector,
      mockMessageService,
      mockAuthManagerService,
      mockCustomerPolicyService,
      mockMenuService
    );
  });
  it('should allow the access to `Customer Edit` page for the logged user', () => {
    mockAuthManagerService.isLogged.and.returnValue(true);
    expect(
      authGuardService.canActivate(
        <ActivatedRouteSnapshot>next,
        <RouterStateSnapshot>{ url: '/customer/edit/1' }
      )
    ).toBeDefined();
  });
  it('should not allow the access to `Customer Edit` page for disconnected user', () => {
    mockAuthManagerService.isLogged.and.returnValue(false);
    expect(
      authGuardService.canActivate(
        <ActivatedRouteSnapshot>next,
        <RouterStateSnapshot>{ url: '/customer/edit/1' }
      )
    ).toBeDefined();
  });
  it('should not allow the access to unauthorized screen', () => {
    next = { data: { feature: 'customer', useCase: 'edit' } };
    mockCustomerPolicyService.isScreenAuthorized.and.returnValue(false);
    mockAuthManagerService.isLogged.and.returnValue(false);
    mockInjector.get.and.returnValue(mockCustomerPolicyService);
    expect(
      authGuardService.canActivate(
        <ActivatedRouteSnapshot>next,
        <RouterStateSnapshot>{ url: '/customer/edit/1' }
      )
    ).toBeDefined();
  });
  it('should check if screen is unauthorized', () => {
    next = { data: { feature: 'customer', useCase: 'edit' } };
    mockCustomerPolicyService.isScreenAuthorized.and.returnValue(false);
    mockAuthManagerService.isLogged.and.returnValue(false);
    mockInjector.get.and.returnValue(mockCustomerPolicyService);
    expect(authGuardService.isScreenAuthorized(next, true)).toBeDefined();
  });
});
