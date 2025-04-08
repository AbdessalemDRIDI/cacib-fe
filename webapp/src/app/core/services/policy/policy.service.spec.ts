import { Policy, PolicyService } from './policy.service';

describe('PolicyService', () => {
  let service: PolicyService, mockAuthManagerService;
  const policies1: Policy[] = [
    {
      role: 'admin',
    },
  ];
  const policies2: Policy[] = [
    {
      role: 'simpleRole1',
    },
    {
      role: 'simpleRole2',
    },
    {
      role: 'admin',
    },
  ];
  const screenField1 = 'screen1';
  const featureField1 = 'feature1';
  const componentField = 'component1';
  const screenField2 = 'screen2';
  const featureField2 = 'feature2';
  const componentField2 = 'component2';
  const SecurityData = {
    screens: {
      feature1: {
        screen1: {
          roles: ['simpleRole', 'admin'],
          enableSecurity: true,
          components: {
            component1: {
              roles: {
                view: ['simpleRole', 'admin'],
              },
              enableSecurity: true,
              type: 'Button',
            },
          },
        },
      },
    },
  };

  beforeEach(() => {
    mockAuthManagerService = jasmine.createSpyObj('mockAuthManagerService', [
      'getRoles',
      'getSecurityData',
    ]);
    service = new PolicyService(mockAuthManagerService);
  });
  describe('#isGranted', () => {
    it('Should Display Component For Empty Policies', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
      expect(service.isGranted(null)).toBeFalsy();
      expect(service.isGranted([])).toBeFalsy();
    });
    it('Should Hide Component For simpleRole Role', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
      expect(service.isGranted(policies1)).toBeFalsy();
    });
    it('Should Display Component For Admin Role', () => {
      mockAuthManagerService.getRoles.and.returnValue(['admin']);
      expect(service.isGranted(policies2)).toBeTruthy();
    });
  });
  describe('#isScreenAuthorized', () => {
    it('Should Display Screen For Empty Policies', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
      expect(service.isScreenAuthorized(null)).toBeTruthy();
      expect(service.isScreenAuthorized([])).toBeTruthy();
    });
    it('Should Display Screen For simpleRole', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isScreenAuthorized(featureField1, screenField1)).toBeTruthy();
    });
    it('Should Display Screen For Role Admin', () => {
      mockAuthManagerService.getRoles.and.returnValue(['admin']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isScreenAuthorized(featureField1, screenField1)).toBeTruthy();
    });
    it('Should Display Screen For Role simpleRole1', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole1']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isScreenAuthorized(featureField1, screenField1)).toBeFalsy();
    });
    it('Should Display Screen When No Granted Roles Are Defined', () => {
      mockAuthManagerService.getRoles.and.returnValue(['admin']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isScreenAuthorized(featureField2, screenField2)).toBeTruthy();
    });
  });
  describe('#isComponentGranted', () => {
    it('Should Display Component For Empty Policies', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
      expect(service.isComponentGranted(null)).toBeTruthy();
      expect(service.isComponentGranted([])).toBeTruthy();
    });
    it('Should Display Component For Role simpleRole', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isComponentGranted(featureField1, screenField1, componentField)).toBeTruthy();
    });
    it('Should Display Component For Role Admin', () => {
      mockAuthManagerService.getRoles.and.returnValue(['admin']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isComponentGranted(featureField1, screenField1, componentField)).toBeTruthy();
    });
    it('Should Hide Component For Role simpleRole1', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole1']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isComponentGranted(featureField1, screenField1, componentField)).toBeFalsy();
    });
    it('Should Display Component When no granted roles are defined ', () => {
      mockAuthManagerService.getRoles.and.returnValue(['simpleRole']);
      mockAuthManagerService.getSecurityData.and.returnValue(SecurityData);
      expect(service.isComponentGranted(featureField2, screenField2, componentField2)).toBeTruthy();
    });
  });
});
