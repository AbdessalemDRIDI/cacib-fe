import { waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let mockHttp;
  const formBuilder = new UntypedFormBuilder();

  beforeEach(waitForAsync(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['post']);
    component = new ChangePasswordComponent(mockHttp, formBuilder);
  }));

  describe('#isValidPassword', () => {
    it('should return true in case of valid password', () => {
      component.form = formBuilder.group(
        {
          newPassword: ['test', [Validators.required]],
          confirmPassword: ['test', [Validators.required]],
          currentPassword: ['oldtest', [Validators.required]],
        },
        {
          validator: ChangePasswordComponent.MatchPassword,
        }
      );

      expect(component.isValidPassword()).toBeTruthy();
    });
    it('should return false in case of invalid password', () => {
      component.form = formBuilder.group(
        {
          newPassword: ['test1', [Validators.required]],
          confirmPassword: ['test2', [Validators.required]],
          currentPassword: ['oldtest', [Validators.required]],
        },
        {
          validator: ChangePasswordComponent.MatchPassword,
        }
      );

      expect(component.isValidPassword()).toBeFalsy();
    });
  });

  describe('#changePassword', () => {
    it('should change the current password of the user', () => {
      component.form = formBuilder.group(
        {
          currentPassword: ['test1', [Validators.required]],
          newPassword: ['test2', [Validators.required]],
          confirmPassword: ['test2', [Validators.required]],
        },
        {
          validator: ChangePasswordComponent.MatchPassword,
        }
      );
      const user = {
        currentPassword: component.form.controls['currentPassword'].value,
        newPassword: component.form.controls['newPassword'].value,
        confirmPassword: component.form.controls['confirmPassword'].value,
      };

      component.changePassword(user);
      expect(mockHttp.post).toHaveBeenCalled();
    });
  });
});
