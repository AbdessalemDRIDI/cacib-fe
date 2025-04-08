export interface Menu {
  /**
   * The menu entry's title
   */
  label: string;
  /**
   * The menu entry's roles
   */
  roles?: string[];
  /**
   * The menu entry's styleName
   */
  styleName?: string;
  /**
   * The menu entry's icon using primeicons or FontAwesome
   */
  icon?: string;
  /**
   * The menu entry's children items
   */
  items?: Menu[];
  /**
   * The menu entry's link to open
   */
  link?: string[];
  /**
   * The menu entry's technical function to call onClick event
   */
  command?: any;
}
