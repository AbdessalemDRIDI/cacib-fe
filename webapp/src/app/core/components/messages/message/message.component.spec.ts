import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { MessagesService } from '@app/core/services/messages/message.service';
import { MessageOptions } from '../models/message.options';
import { MessageComponent } from './message.component';

describe('Core: MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let nativeElement: Element;
  let opts: MessageOptions = {
    title: 'Test Message Title',
    message: 'Test message content',
  };

  let mockMessagesService = { messageState: of(opts) };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MessageComponent],
      providers: [{ provide: MessagesService, useValue: mockMessagesService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
