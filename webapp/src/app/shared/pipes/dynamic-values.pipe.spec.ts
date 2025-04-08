import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatorService } from '@services/translator/translator.service';
import { DynamicValuesPipe } from '@shared/pipes/dynamic-values.pipe';

describe('Dynamic values Pipe', () => {
  let pipe: DynamicValuesPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslatorService],
      imports: [TranslateModule.forRoot()],
    });
  });

  describe('#transform ', () => {
    it('should return the formatted data in case of different value', () => {
      const translateService: TranslatorService = TestBed.get(TranslatorService);
      pipe = new DynamicValuesPipe(translateService);
      expect(pipe.transform('London', 'search-customized-columns-airport-from-name')).toBe(
        'London'
      );
      expect(
        pipe.transform('London', 'DynamicValues.ssearch-customized-columns-airport-from-name')
      ).toBe('London');
    });
  });
});
