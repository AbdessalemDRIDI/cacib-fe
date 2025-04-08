import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { ComponentFactoryResolver, DebugElement } from '@angular/core';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;
  let componentFactoryResolver: ComponentFactoryResolver;

  beforeEach(waitForAsync(() => {
    let mockAuthManagerService = { getUserName: () => 'SimpleUser' };
    let mockTranslatorService = {
      getMessage: (content: string, key: string) => {
        return of(content);
      },
    };
    let mockPipe = {
      transform: (value: any, enumerationName?: any) => {
        return 'Change Password';
      },
    };
    let mockHttpClient = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManagerService, useValue: mockAuthManagerService },
        { provide: TranslatorService, useValue: mockTranslatorService },
        { provide: HttpClient, useValue: mockHttpClient },
      ],
      imports: [
        SlideMenuModule,
        ButtonModule,
        DialogModule,
        PasswordModule,
        FormsModule,
        ReactiveFormsModule,
        MessagesModule,
        BrowserAnimationsModule,
        UserInfoComponent,
        DialogComponent,
        ChangePasswordComponent,
      ],
    }).compileComponents();

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    componentFactoryResolver = debugElement.injector.get(ComponentFactoryResolver);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the change password link', () => {
    component.hideChangePasswd();
    expect(component.showChangePasswd()).toBeFalsy();
  });

  it('should init the menuItems', (done) => {
    const changePasswordLabel = (component.items[0].label = 'Change Password');
    const logoutLabel = (component.items[1].label = 'Logout');
    expect(changePasswordLabel).toBe('Change Password');
    expect(logoutLabel).toBe('Logout');
    done();
  });

  it('should hide the UserInfo menu', () => {
    spyOn(component.menu, 'toggle');
    component.openChangePasswordComponent();
    expect(element.querySelector('.user-info.ui-slidemenu')).toBeNull();
    expect(component.menu.toggle).toHaveBeenCalledTimes(1);
    expect(component.menu.toggle).toHaveBeenCalledWith('hide');
  });

  it('should logout', function () {
    let spy = spyOn(component.logoutEvt, 'emit');
    component.doLogout();
    expect(spy).toHaveBeenCalled();
  });
});
