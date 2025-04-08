import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ACTIVE_SESSION,
  COUNTDOWN,
  INACTIVE_SESSION,
  IdleService,
  LOGOUT_SESSION,
  STAY_SIGNED_IN,
} from './idleSessionTimeOut-service';

import { Footer } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AccessibilityDirective } from '../../../shared/directives/accessibility.directive';

/**
 * This component handles user inactivity situations within a session.
 * It displays a dialog to the user prior to session expiry and handles logout and session maintenance actions.
 */
@Component({
  selector: 'vg-idle-session-timeout',
  templateUrl: './idleSessionTimeOut.component.html',
  providers: [IdleService],
  standalone: true,
  imports: [DialogModule, AccessibilityDirective, Footer, Button],
})
export class IdleSessionTimeOutComponent implements OnInit, OnDestroy {
  /** The property that holds the session timeout in minutes. */
  @Input() timeOutSession: number = 15;
  /** The event that gets emitted when a logout needs to happen. */
  @Output() logout = new EventEmitter<void>();
  /** The property that holds the idle title. */
  idleTitle: string = $localize`:message;idleTitle:Your session is about to expire`;
  /** The property that holds the idle auto disconnect message. */
  idleAutoDisconnectMessagePart1: string = $localize`:message;idleAutoDisconnectMessagePart1:You will be automatically signed out in`;
  /** The property that holds the idle auto disconnect message 2. */
  idleAutoDisconnectMessagePart2: string = $localize`:message;idleAutoDisconnectMessagePart2:seconds`;
  /** The property that holds the idle action message. */
  idleActionMessage: string = $localize`:message;idleActionMessage:Do you want to stay signed in?`;
  /** The property that holds the idle sign out string. */
  idleSignOut: string = $localize`:message;idleSignOut:Sign Out Now`;
  /** The property that holds the idle sign in string. */
  idleSignIn: string = $localize`:message;idleSignIn:Stay Signed In`;
  /** A boolean property that indicates whether to show the dialog or not. */
  showDialog: boolean = false;
  /** The previous state of the showDialog property. */
  private previousShowDialog: boolean = false;
  /** The property that holds the countdown time in seconds. */
  countdown: number = 30;
  /** The property that holds the interval ID for the countdown. */
  countdownIntervalId: any;
  /** A reference to the 'Continue' button in the DOM. */
  @ViewChild('continueButton', { read: ElementRef }) continueButton!: ElementRef;
  /** An instance of the IdleService */
  idleService = inject(IdleService);
  private dataSubscription: Subscription;

  constructor() {
    this.dataSubscription = this.idleService.getData().subscribe((data) => {
      this.handleData(data);
    });
  }
  /**
   * handle data provided by the idle channel
   * @param data
   */
  handleData(data: string) {
    switch (data) {
      case ACTIVE_SESSION:
        if (!this.showDialog) {
          this.handleActive();
        }
        break;
      case LOGOUT_SESSION:
        this.stopCountdown();
        this.onLogout();
        break;
      case STAY_SIGNED_IN:
        this.stopCountdown();
        this.onContinue();
        break;
      case COUNTDOWN:
        if (this.countdown === 0) {
          this.onLogout();
        }
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.idleService.setTimeOutSession(this.timeOutSession);
    this.idleService.startWatching();
    this.idleService.getExpiredSession().subscribe((isExpired) => {
      if (isExpired && !this.showDialog) {
        this.idleService.getIdleChannel().postMessage(INACTIVE_SESSION);
        this.showDialog = true;
        this.countdown = 30;
        this.startCountdown();
      }
    });
  }
  /**
   * Starts a countdown. If the countdown reaches 0, it triggers a logout.
   */
  startCountdown() {
    this.countdownIntervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        this.idleService.getIdleChannel().postMessage(COUNTDOWN);
      } else if (this.countdown == 0) {
        this.idleService.getIdleChannel().postMessage(LOGOUT_SESSION);
        this.onLogout();
      }
    }, 1000);
  }
  /**
   * Stops the countdown.
   */
  stopCountdown() {
    clearInterval(this.countdownIntervalId);
    this.countdownIntervalId = null;
  }
  staySignedIn() {
    this.idleService.getIdleChannel().postMessage(STAY_SIGNED_IN);
    this.stopCountdown();
    this.onContinue();
  }
  /**
   * Called when user decides to continue the session.
   * Stops the countdown, resets the timer and hides the dialog.
   */
  onContinue() {
    this.idleService.resetTimer(this.timeOutSession);
    this.showDialog = false;
  }
  signOut() {
    this.onLogout();
    this.idleService.getIdleChannel().postMessage(LOGOUT_SESSION);
  }
  /**
   * Called when the user decides to logout or the countdown reaches zero.
   * Stops the countdown, emits the logout event and hides the dialog.
   */
  onLogout() {
    this.idleService.stopTimer();
    this.logout.emit();
    this.showDialog = false;
  }
  /**
   * Method to handle actions when user is active
   */
  handleActive() {
    this.idleService.resetTimer(this.timeOutSession);
  }
  ngOnDestroy() {
    this.stopCountdown();
    this.idleService.stopTimer();
    this.idleService.stopChannel();
    this.dataSubscription.unsubscribe();
  }
  ngAfterViewChecked() {
    if (this.showDialog && !this.previousShowDialog) {
      this.focusOnButton();
    }
    this.previousShowDialog = this.showDialog;
  }
  /**
   * If the 'Enter' key is pressed and the dialog is shown, it continues the session.
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.showDialog) {
      this.onContinue();
    }
  }
  /**
   * This method focuses on the 'Continue' button.
   * If the button is present in the DOM, it sets the focus to it.
   */
  focusOnButton() {
    const button = this.continueButton?.nativeElement?.querySelector('button');
    if (button) {
      button.focus();
    }
  }
}
