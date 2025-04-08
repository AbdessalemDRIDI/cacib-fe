import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProfileService } from '@app/core/services/profile/profile.service';
import { DateFormatDirective } from './dateFormat.directive';
export class MockElementRef {
  nativeElement: {};
}

export class MockProfileService {
  getDateFormat() {
    return 'yyyy-mm-dd';
  }
}

describe('DateFormatDirective', () => {
  let elRef: ElementRef;
  let profileServ: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: new MockElementRef() },
        { provide: ProfileService, useValue: new MockProfileService() },
      ],
    });
    elRef = TestBed.inject(ElementRef);
    profileServ = TestBed.inject(ProfileService);
  });

  it('should create an instance', () => {
    const directive = new DateFormatDirective(elRef, profileServ);
    expect(directive).toBeTruthy();
  });
});
