import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslatorService } from './translator.service';

describe('TranslatorService', () => {
  let service: TranslatorService;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;
  beforeEach(() => {
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['get']);
    TestBed.configureTestingModule({
      providers: [TranslatorService, { provide: TranslateService, useValue: mockTranslateService }],
    });
    service = TestBed.inject(TranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should translate the `FullName` field to french', () => {
    mockTranslateService.get.and.returnValue(of('Nom et Prénom'));
    expect(service.translateField('Customer', 'fullName')).toBe('Nom et Prénom');
  });

  it('should translate the `Approved` enumeration value to french', () => {
    mockTranslateService.get.and.returnValue(of('Approuvé'));
    expect(service.translateEnumItem('Approved', 'enum')).toBe('Approuvé');
  });
});
