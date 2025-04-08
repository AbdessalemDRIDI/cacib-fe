import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProfileService } from '@services/profile/profile.service';
import { GridPipe } from '@shared/pipes/grid.pipe';
import { NumberPipe } from '@shared/pipes/number.pipe';

describe('Grid Pipe', () => {
  let pipe: GridPipe;
  let profile: ProfileService;
  let numberPipe: NumberPipe;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ProfileService, provideHttpClient(withInterceptorsFromDi())],
    });
    httpClient = TestBed.get(HttpClient);
    profile = TestBed.get(ProfileService);
    numberPipe = new NumberPipe(new DecimalPipe('fr'), profile);
    pipe = new GridPipe(profile, numberPipe, new DatePipe('fr'));
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a falsy result in case of empty value', () => {
    expect(pipe.transform('', 'date', '', '')).toBeFalsy();
  });
  it('should return the same date in case of a valid value', () => {
    expect(pipe.transform('10/08/1979', 'date', '', '')).toBe('10/08/1979');
  });
});
