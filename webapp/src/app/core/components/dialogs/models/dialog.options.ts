/**
 * The dialog component's properties
 */
export interface DialogOptions {
  /**
   * The title of the dialog
   */
  title: string;
  /**
   * The body content
   */
  content?: string;
  /**
   * The buttons to be displayed in the footer
   */
  buttons?: Array<DialogButton | string>;
  /**
   * The YES property
   */
  accept;
  /**
   * The close property
   */
  close?;
}
/**
 * The dialog button's properties
 */
export interface DialogButton {
  /**
   * The button's label
   */
  text?: string;
  /**
   * The button's icon
   */
  icon?: string;
  /**
   * The closing option, if `true` an X icon will appear in the header
   */
  isClosable?: boolean;
  /**
   * The styleName
   */
  cssClass?: string[];
  /**
   * The handler js
   */
  handler?: (value: any) => boolean | void;
}
