import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MessageOptions } from '@core/components/messages/models/message.options';
import { MessagesService as Messages } from '@services/messages/message.service';
import { ToastModule } from 'primeng/toast';
/**
 * Displays toast messages of type: `error`, `ìnfo`, `warning`, `success` or `confirmation`.
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [MessageService],
  standalone: true,
  imports: [ToastModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit, OnDestroy {
  /**
   * The messages to display
   */
  msgs: Message[] = [];
  /**
   * The subscription to the message emitter observable
   */
  private subscription: Subscription;
  /**
   * The messages service
   */
  messagesService = inject(Messages);
  /**
   * The message service for primeng toast
   */
  messageService = inject(MessageService);

  /**
   * Subscribes to the message emitter observable
   */
  ngOnInit() {
    this.subscription = this.messagesService.messageState
      .pipe(filter((value) => value.message !== 'close'))
      .subscribe((message: MessageOptions) => {
        this.show(message);
      });
  }
  /**
   * Displays the message
   * @param message
   */
  show(message: MessageOptions) {
    this.messageService.addAll([
      { key: 'br', severity: message.mode, detail: message.message, life: 5000, sticky: false },
    ]);
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
