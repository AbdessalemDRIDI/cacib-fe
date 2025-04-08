import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ACTIVE_SESSION,
  COUNTDOWN,
  IdleService,
  LOGOUT_SESSION,
  STAY_SIGNED_IN,
} from './idleSessionTimeOut-service';
import { IdleSessionTimeOutComponent } from './idleSessionTimeOut.component';

describe('IdleSessionTimeOutComponent', () => {
  let component: IdleSessionTimeOutComponent;
  let fixture: ComponentFixture<IdleSessionTimeOutComponent>;
  let idleService: IdleService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IdleSessionTimeOutComponent],
      providers: [IdleService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleSessionTimeOutComponent);
    component = fixture.componentInstance;
    idleService = TestBed.inject(IdleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset timer and hide dialog when continue', () => {
    spyOn(idleService, 'resetTimer').and.callThrough();
    component.onContinue();
    fixture.whenStable().then(() => {
      expect(idleService.resetTimer).toHaveBeenCalled();
      expect(component.showDialog).toEqual(false);
    });
  });

  it('should emit logout event when logout', () => {
    spyOn(component.logout, 'emit').and.callThrough();
    component.onLogout();
    expect(component.logout.emit).toHaveBeenCalled();
    expect(component.showDialog).toBeFalsy();
  });

  describe('IdleSessionTimeOutComponent with multiple tabs', () => {
    it('should reset timer in all tabs when user is active', () => {
      spyOn(idleService, 'resetTimer').and.callThrough();
      component.handleData(ACTIVE_SESSION);
      fixture.whenStable().then(() => {
        expect(idleService.resetTimer).toHaveBeenCalled();
        expect(component.showDialog).toBeFalsy();
      });
    });
    it('should logout when logout event is received', () => {
      const spy = spyOn(component, 'onLogout').and.callThrough();
      component.handleData(LOGOUT_SESSION);
      expect(spy).toHaveBeenCalled();
    });

    it('should continue session when STAY_SIGNED_IN event is received', () => {
      const spy = spyOn(component, 'onContinue').and.callThrough();
      component.handleData(STAY_SIGNED_IN);
      expect(spy).toHaveBeenCalled();
    });

    it('should stop countdown when LOGOUT_SESSION event is received', () => {
      const spy = spyOn(component, 'stopCountdown').and.callThrough();
      component.handleData(LOGOUT_SESSION);
      expect(spy).toHaveBeenCalled();
    });

    it('should emit logout event when countdown reaches 0', () => {
      spyOn(component.logout, 'emit').and.callThrough();
      component.countdown = 0;
      component.handleData(COUNTDOWN);
      expect(component.logout.emit).toHaveBeenCalled();
    });

    it('should continue the session when the Enter key is pressed and the dialog is shown', () => {
      const continueSpy = spyOn(component, 'onContinue').and.callThrough();
      component.showDialog = true;
      const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeyboardEvent(mockEvent);
      expect(continueSpy).toHaveBeenCalled();
    });
  });
});
