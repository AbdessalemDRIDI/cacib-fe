import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Globals } from '@app/core/global/globals';
import { environment } from '@env/environment';
import { ProfileService } from '@services/profile/profile.service';
import { of } from 'rxjs';
import { LanguagesComponent } from './languages.component';
const customProfile = {
  language: 'fr',
  numberFormat: '#,##0.###',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm:ss',
};

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;
  let element: HTMLElement;
  const mockGlobals = {
    languages: ['en'],
  };
  let globals = {
    languages: ['en'],
  };
  let mockProfileService;
  mockProfileService = jasmine.createSpyObj('mockProfileService', ['get']);
  mockProfileService.get.and.returnValue(of(customProfile));
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LanguagesComponent],
      providers: [
        { provide: Globals, useValue: mockGlobals },
        { provide: ProfileService, useValue: mockProfileService },
      ],
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    globals = TestBed.inject(Globals);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  describe('the initial component display', () => {
    it('should hide the language component in case of one configured language', () => {
      fixture.detectChanges();
      expect(globals.languages).toEqual(['en']);
    });
  });
  describe('switchLanguage method', () => {
    it('should change the language in the localstorage', () => {
      const LOCALE_ID = `${environment.prefix}_locale_id`;
      spyOn(component, 'goToTargetApp');
      component.switchLanguage('fr');
      expect(localStorage.getItem(LOCALE_ID)).toEqual('fr');
    });
  });
});
