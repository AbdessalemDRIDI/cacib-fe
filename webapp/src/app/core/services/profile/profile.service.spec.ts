import { TestBed } from '@angular/core/testing';
import { DatePrecision, DateType } from '@app/core/utils';
import { environment } from '@env/environment';
import { HttpUrlEncodingCodec } from './../auth/encoder';
import { ProfileService } from './profile.service';

const LOCALE_ID = `${environment.prefix}_locale_id`;
const PROFILE = `${environment.prefix}_profile`;
const customProfile = {
  language: 'fr',
  numberFormat: '#,##0.###',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm:ss',
};
describe('Profile Service', () => {
  let service: ProfileService;
  let mockHttp,
    mockEncoder = new HttpUrlEncodingCodec();
  beforeEach(() => {
    mockEncoder = TestBed.inject(HttpUrlEncodingCodec);
    mockHttp = jasmine.createSpyObj(mockHttp, ['get']);
    spyOn(mockEncoder, 'encodeValue').and.returnValue('');
    localStorage.removeItem(PROFILE);
    service = new ProfileService(mockHttp, mockEncoder);
  });

  describe('#getProfile', () => {
    it('should return the default profile', () => {
      expect(service.getProfile()).toBeDefined();
      expect(service.getProfile()).toEqual(service.getDefault());
    });

    it('should return the profile stored in the local storage', () => {
      localStorage.setItem(PROFILE, JSON.stringify(customProfile));
      service = new ProfileService(mockHttp, mockEncoder);
      expect(service.getProfile()).toBeDefined();
      expect(service.getProfile()).not.toEqual(service.getDefault());
      expect(service.getProfile()).toEqual(customProfile);
    });
  });

  describe('#getCurrentProfile', () => {
    it('should return the profile stored in the local storage', () => {
      localStorage.setItem(PROFILE, JSON.stringify(customProfile));
      service = new ProfileService(mockHttp, mockEncoder);
      expect(service.getCurrentProfile()).toBeDefined();
      expect(service.getCurrentProfile()).not.toEqual(service.getDefault());
      expect(service.getCurrentProfile()).toEqual(customProfile);
    });
  });

  describe('#getCurrentLanguage', () => {
    it('should return the current profile language', () => {
      expect(service.getCurrentLanguage()).toBe('en');
    });
  });

  describe('#getCurrentNumberFormat', () => {
    it('should return the current profile number format', () => {
      expect(service.getCurrentNumberFormat()).toBe('#,##0.###');
    });
  });

  describe('#getNumberFormat', () => {
    it('should return the profile number format', () => {
      expect(service.getNumberFormat(3)).toBe('#,##0.###');
    });
  });

  describe('#getCurrentDateFormat', () => {
    it('should return the current profile date format', () => {
      expect(service.getCurrentDateFormat()).toBe('dd/MM/yyyy');
    });
  });

  describe('#getDateFormat', () => {
    it('should return the profile date format', () => {
      spyOn(DatePrecision, 'getFormatAccordingToPrecisions');
      service.getDateFormat(DateType.TIME_STAMP, DatePrecision.MILLISECOND);
      expect(DatePrecision.getFormatAccordingToPrecisions).toHaveBeenCalledWith(
        'dd/MM/yyyy HH:mm:ss:SSS',
        DatePrecision.MILLISECOND
      );
      service.getDateFormat(DateType.DATE, DatePrecision.SECOND);
      expect(DatePrecision.getFormatAccordingToPrecisions).toHaveBeenCalledWith(
        'dd/MM/yyyy',
        DatePrecision.SECOND
      );
      service.getDateFormat(DateType.TIME, DatePrecision.MINUTE);
      expect(DatePrecision.getFormatAccordingToPrecisions).toHaveBeenCalledWith(
        'HH:mm:ss:SSS',
        DatePrecision.MINUTE
      );
    });
    it('should return the current date format', () => {
      expect(service.getDateFormat('DateTime')).toBe('dd/MM/yyyy');
    });
  });

  describe('#getCurrentTimeFormat', () => {
    it('should return the current profile time format', () => {
      expect(service.getCurrentTimeFormat()).toBe('HH:mm:ss:SSS');
    });
  });

  describe('#getTimeFormat', () => {
    it('should return the profile time format', () => {
      spyOn(DatePrecision, 'getFormatAccordingToPrecisions').and.returnValue('HH:mm:ss:SSS');
      expect(service.getTimeFormat(DatePrecision.MILLISECOND)).toBe('HH:mm:ss:SSS');
    });
  });

  describe('#getCurrentTimeStampFormat', () => {
    it('should return the current profile TimeStampFormat', () => {
      expect(service.getCurrentTimeStampFormat()).toBe('dd/MM/yyyy HH:mm:ss:SSS');
    });
  });

  describe('#getLocale', () => {
    it('should return null in case of no stored value', () => {
      expect(service.getLocale()).toBeDefined();
    });
    it('should return the locale stored in the local storage', () => {
      localStorage.setItem(LOCALE_ID, 'en');
      expect(service.getLocale()).toBe('en');
    });
  });

  describe('#getNumberSymbol', () => {
    it('should return the Grouping Symbol format', () => {
      expect(service.getGroupingSymbol()).toEqual(',');
    });
  });

  describe('#getDecimalSymbol', () => {
    it('should return the Decimal Symbol format', () => {
      expect(service.getDecimalSymbol()).toEqual('.');
    });
  });

  describe('#getDigitsInfo', () => {
    it('should return the  Digits Info format', () => {
      expect(service.getDigitsInfo('2')).toEqual('1.0-2');
    });
  });
});
