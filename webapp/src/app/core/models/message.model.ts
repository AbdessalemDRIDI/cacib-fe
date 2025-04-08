/**
 * Represents the structure of an Message within the application.
 * This interface is used to define the properties that an Message object should have.
 */
export interface Message {
  id?: number;
  messageContent?: string;
  messageType?: string;
  dateReceived?: Date;
  status?: string;
  type?: string;
}
