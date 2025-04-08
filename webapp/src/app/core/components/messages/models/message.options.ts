/**
 * The supported message types
 */
export declare type MessageType = 'info' | 'error' | 'success' | 'warn' | 'confirmation';
/**
 * The message's properties
 */
export interface MessageOptions {
  /**
   * The title of the message
   */
  title?: string;
  /**
   * The content of the message
   */
  message?: string;
  /**
   * The type to be used
   */
  mode?: MessageType | string;
  /**
   * The duration of displaying a toast message
   */
  duration?: number;
  /**
   * The buttons to be rendered
   */
  buttons?: (MessageButton | string)[];
}
/**
 * The message button's properties
 */
export interface MessageButton {
  /**
   * The button's label
   */
  text?: string;
  /**
   * The button's icon
   */
  icon?: string;
  /**
   * The styleNames
   */
  cssClass?: string[];
  /**
   * The closing option, if `true` an X icon will appear in the header
   */
  isClosable?: boolean;
  /**
   * The handler js
   */
  handler?: (value: any) => boolean | void;
}
