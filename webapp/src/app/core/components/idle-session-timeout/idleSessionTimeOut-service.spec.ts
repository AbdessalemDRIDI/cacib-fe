import { TestBed } from '@angular/core/testing';
import { IdleService } from './idleSessionTimeOut-service';

describe('IdleService', () => {
  let service: IdleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdleService],
    });
    service = TestBed.inject(IdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
