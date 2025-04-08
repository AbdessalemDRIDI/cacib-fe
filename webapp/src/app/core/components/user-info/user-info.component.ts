import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  model,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

import { AuthManagerService } from '@services/auth/auth-manager.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { AccessibilityDirective } from '../../../shared/directives/accessibility.directive';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserDetailsComponent } from '../user-details/user-details.component';

/**
 * Component that displays a split button displaying the logged user name with the following items:
 * - Language switcher
 * - Change password
 * - Logout
 */
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AvatarModule,
    ButtonModule,
    MenuModule,
    SlideMenuModule,
    DialogModule,
    AccessibilityDirective,
    ChangePasswordComponent,
    UserDetailsComponent,
  ],
})
export class UserInfoComponent implements OnInit {
  name = signal('');
  items = [
    {
      label: $localize`:message;changePassword:Change Password`,
      icon: 'fa-solid fa-key',
      command: (event) => {
        this.openChangePasswordComponent();
      },
    },
    {
      label: $localize`:message;Logout:Logout`,
      icon: 'fa-solid fa-right-from-bracket',
      command: (event) => {
        this.doLogout();
      },
    },
  ];
  showChangePasswd = model(false);
  @Output() logoutEvt = new EventEmitter();
  @ViewChild('menu', { static: false }) menu;

  constructor(private authService: AuthManagerService) {}

  ngOnInit() {
    this.name.set(this.authService.getUserName());
  }
  /**
   * Open the ChangePassword Component within a dialog
   */
  openChangePasswordComponent(): void {
    this.menu.toggle('hide');
    this.showChangePasswd.set(true);
  }
  /**
   * Hie the change password dialog
   */
  hideChangePasswd() {
    this.showChangePasswd.set(false);
  }
  /**
   * Run the logout event
   */
  doLogout() {
    this.logoutEvt.emit();
  }
}
