import { TestBed } from '@angular/core/testing';
import { AuthManagerService } from '../auth/auth-manager.service';
import { MenuService } from './menu.service';

describe('filterByRole', () => {
  let authServiceSpy: jasmine.SpyObj<AuthManagerService>;
  let service: MenuService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthManagerService', [
      'getRoles',
      'isUserRolesHas',
      'getUserName',
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: AuthManagerService, useValue: spy }],
    });
    authServiceSpy = TestBed.inject(AuthManagerService) as jasmine.SpyObj<AuthManagerService>;
    service = new MenuService(authServiceSpy);
  });

  it('should return an empty menu', () => {
    let menu = [];
    let listMenuFromSecurity = [];
    authServiceSpy.isUserRolesHas.and.returnValues();
    const filteredMenu = service.filterByRole(menu, listMenuFromSecurity);
    expect(filteredMenu).toEqual([]);
  });

  it('should filter out menu items that the user does not have access to', () => {
    const menu = [
      { id: 'item1', roles: ['admin'] },
      { id: 'item2', roles: ['user'] },
      { id: 'item3', roles: ['admin', 'user'] },
    ];
    const listMenuFromSecurity: any = {
      item1: { roles: ['admin'] },
      item2: { roles: ['user'] },
      item3: { roles: ['admin'] },
    };

    authServiceSpy.isUserRolesHas.and.returnValues(false, true, true);
    const filteredMenu = service.filterByRole(menu, listMenuFromSecurity);
    expect(filteredMenu).toEqual([
      { id: 'item2', roles: ['user'] },
      { id: 'item3', roles: ['admin', 'user'] },
    ]);
  });
});
