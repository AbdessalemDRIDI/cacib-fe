import { TestBed } from '@angular/core/testing';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateEnumPipe } from './translate-enum.pipe';

describe('TranslateEnumPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslatorService],
      imports: [TranslateModule.forRoot()],
    });
  });
  describe('#transform ', () => {
    it('should return the formatted data in case of different value', () => {
      const translateService: TranslatorService = TestBed.get(TranslatorService);
      const pipe = new TranslateEnumPipe(translateService);
      expect(pipe.transform('')).toBe('');
      expect(pipe.transform(true, '', true)).toBe(true);
      expect(pipe.transform(false, '', false)).toBe('false');
    });
  });
});
