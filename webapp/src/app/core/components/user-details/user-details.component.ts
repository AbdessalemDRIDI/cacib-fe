import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

/**
 * Displays user details with an avatar and triggers password change on click.
 */
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AvatarModule],
})
export class UserDetailsComponent {
  @Input() name: string;

  @Output() avatarClick = new EventEmitter<string>();
}
