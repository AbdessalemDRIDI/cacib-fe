import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent, merge, timer } from 'rxjs';
export const ACTIVE_SESSION: string = 'active';
export const LOGOUT_SESSION: string = 'logout';
export const STAY_SIGNED_IN: string = 'stay signed in';
export const INACTIVE_SESSION: string = 'inactive';
export const COUNTDOWN: string = 'countdown';

/**
 * This service is used to monitor user activity and emit an event when the user is idle for a certain amount of time.
 */
@Injectable()
export class IdleService {
  // Observable to monitor various user activity events
  private idle$!: Observable<any>;
  // Subscription to the timer that fires when the user is idle
  private timer$!: Subscription;
  // The amount of time (in milliseconds) before the user is considered idle
  private timeOutMilliSeconds!: number;
  // Subscription to the user activity events
  private idleSubscription!: Subscription;
  // A subject that emits a boolean value when the user's session expires
  public expired$: Subject<boolean> = new Subject<boolean>();
  // A broadcast channel for sending idle and active messages
  private idleChannel: BroadcastChannel;
  // A subject to communicate channel data to the idle component
  private dataSubject$ = new Subject<string>();

  constructor() {
    this.idleChannel = new BroadcastChannel('idleChannel');
    this.idleChannel.addEventListener('message', this.handleChannel);
  }
  /**
   * Channel event handler
   * @param event
   */
  private handleChannel = (event: MessageEvent) => {
    switch (event.data) {
      case INACTIVE_SESSION:
        this.expired$.next(true);
        break;
      case ACTIVE_SESSION:
      case LOGOUT_SESSION:
      case STAY_SIGNED_IN:
      case COUNTDOWN:
        this.setData(event.data);
        break;
      default:
        break;
    }
  };
  /**
   * @param timeOutSeconds The amount of time (in seconds) before the user is considered idle
   * @returns An Observable that emits a boolean value when the user's session expires
   */
  public startWatching() {
    this.idle$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'DOMMouseScroll'),
      fromEvent(document, 'mousewheel'),
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'MSPointerMove'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize')
    );
    if (this.timer$) {
      this.timer$.unsubscribe();
    }
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
    this.idleSubscription = this.idle$.subscribe(() => {
      this.onActivity();
    });
    this.startTimer();
  }
  /**
   * returns the session expiration observable
   */
  public getExpiredSession() {
    return this.expired$;
  }
  /**
   * Starts a timer that fires when the user has been idle for a specified amount of time.
   */
  private startTimer() {
    this.timer$ = timer(this.timeOutMilliSeconds).subscribe(() => {
      this.expired$.next(true);
    });
  }
  /**
   * Resets the idle timer.
   */
  public resetTimer(timeOutMn?: number) {
    this.timer$.unsubscribe();
    if (timeOutMn) {
      this.setTimeOutSession(timeOutMn);
    }
    this.startTimer();
  }
  /**
   * Stops the idle timer.
   */
  public stopTimer() {
    this.timer$.unsubscribe();
    this.idleSubscription.unsubscribe();
  }
  /**
   * Resets the idle timer and emits an event to indicate that user activity was detected.
   */
  private onActivity() {
    this.idleChannel.postMessage(ACTIVE_SESSION);
    this.resetTimer();
    this.expired$.next(false);
  }
  setTimeOutSession(timeOutMn: number) {
    this.timeOutMilliSeconds = timeOutMn * 60 * 1000;
  }
  stopChannel() {
    this.idleChannel.removeEventListener('message', this.handleChannel);
  }

  /**
   * returns the idle channel
   */
  public getIdleChannel() {
    return this.idleChannel;
  }
  /**
   * send data to the idle component
   * @param data
   */
  setData(data: any) {
    this.dataSubject$.next(data);
  }
  /**
   * get data observable
   */
  getData(): Observable<string> {
    return this.dataSubject$;
  }
}
