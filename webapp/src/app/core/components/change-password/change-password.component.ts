import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { environment } from '@env/environment';
import { Footer, Message } from 'primeng/api';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const BASE_PATH = environment.basePath;
/**
 * This component displays a form to change the password of the `logged` user.
 * You can disable this feature via UI Studio tool by following the wiki link below:
 * https://wiki.vermeg.com/display/PFD/Workspace+Properties
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    InputTextModule,
    PasswordModule,
    Footer,
    Button,
  ],
})
export class ChangePasswordComponent implements OnInit {
  /**
   * The current password value
   */
  currentPassword: string;
  /**
   * The user name property
   */
  userName: string;
  /**
   * The new filled password
   */
  newPassword: string;
  /**
   * The filled confirmation password
   */
  confirmPassword: string;
  /**
   * The form builder
   */
  form: UntypedFormGroup;
  /**
   * The error/ warning messages to display
   */
  msgs: Message[] = [];
  /**
   * @private
   */
  parentContainer: ViewContainerRef;
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**
   * Display the component or not
   */
  @Output() hideDialog = new EventEmitter<Boolean>();
  /**
   * Display the component or not
   */
  @Input() visible = false;

  constructor(
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder
  ) {}

  /**
   * Validates the filled new password
   * @param abstractControl
   */
  static MatchPassword(control: AbstractControl) {
    const newPassword = control.get('newPassword').value;
    const confirmPassword = control.get('confirmPassword').value;
    const currentPassword = control.get('currentPassword').value;
    if (newPassword !== confirmPassword || newPassword === currentPassword) {
      // tslint:disable-next-line:no-backbone-get-set-outside-model
      control.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
  /**
   * Initiliazes the form
   */
  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        userName: ['', [Validators.required]],
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: ChangePasswordComponent.MatchPassword,
      } as AbstractControlOptions
    );
  }
  /**
   * Submit the filled form to a REST service
   */
  submitForm(): void {
    if (this.form.valid) {
      const user = {
        userName: this.form.controls['userName'].value,
        currentPassword: this.form.controls['currentPassword'].value,
        newPassword: this.form.controls['newPassword'].value,
        confirmPassword: this.form.controls['confirmPassword'].value,
      };

      this.changePassword(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.msgs = [];
            this.msgs.push({
              severity: 'success',
              detail: $localize`:message;changePasswordPasswordChanged:Your password has been changed successfully!`,
            });
            this.hide();
          },
          (error) => {
            this.msgs = [];
            this.msgs.push({
              severity: 'error',
              detail: $localize`:message;changePasswordRequiredFields:Please check the mandatory fields`,
            });
          }
        );
    }
  }

  /**
   * Changes the password
   * @param credential get the new password entred by the user
   * @returns {Observable}
   */
  changePassword(credential): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams({
      fromObject: {
        username: credential.userName,
        oldPassword: credential.currentPassword,
        newPassword: credential.newPassword,
      },
    });
    return this.http.post(`${BASE_PATH}/security/changePassword`, body, {
      headers,
    });
  }

  /**
   * Checks if the new filled password is `valid`or `not`
   */
  isValidPassword() {
    return (
      (this.form.controls['confirmPassword'].value === '' &&
        this.form.controls['newPassword'].value === '') ||
      (this.form.controls['confirmPassword'].valid &&
        this.form.controls['confirmPassword'].value === this.form.controls['newPassword'].value)
    );
  }
  /**
   * Hides the dialog
   */
  hide() {
    this.form.reset({});
    this.hideDialog.emit(true);
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
