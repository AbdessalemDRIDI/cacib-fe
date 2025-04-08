import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { LoaderMaskComponent } from '../../loaders/loader-mask/loader-mask.component';
import { FooterScreenComponent } from '../footer-screen/footer-screen.component';
import { HeaderScreenComponent } from '../header-screen/header-screen.component';
/**
 * The main screen component which is responsible for dividing the screen into three major parts (Header, Body and Footer)
 * The purpose of using @ContentChildren is to access the template references (child components) used in the parent screen
 * There are four inputs passed to the screen component :
 * style : a string which contains the style of the screen
 * feature, title and screen : this parameters are passed to the headerScreen component
 *
 * This class should not be modified.
 */
@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  standalone: true,
  imports: [
    LoaderMaskComponent,
    HeaderScreenComponent,
    NgClass,
    NgTemplateOutlet,
    FooterScreenComponent,
  ],
})
export class ScreenComponent {
  /**
   * Element for the actions region
   */
  @ContentChild('headerActions', { read: TemplateRef, static: false })
  headerActions: TemplateRef<any>;
  /**
   * Element for the header region
   */
  @ContentChild('headerTitle', { read: TemplateRef, static: false })
  headerTitle: TemplateRef<any>;
  /**
   * Element for the body region
   */
  @ContentChild('bodyScreen', { read: TemplateRef, static: false })
  bodyScreen: TemplateRef<any>;
  /**
   * Element for the footer region
   */
  @ContentChild('footerActions', { read: TemplateRef, static: false })
  footerActions: TemplateRef<any>;
  /**
   * Element for the footer region of left actions
   */
  @ContentChild('footerActionsLeft', { read: TemplateRef, static: false })
  footerActionsLeft: TemplateRef<any>;

  /**
   * Element for the outlets region
   */
  @ContentChild('outlets', { read: TemplateRef, static: false })
  outlets: TemplateRef<any>;
  /**
   * Element for the body region
   */
  @ContentChild('leftBodyScreen', { read: TemplateRef, static: false })
  leftBodyScreen: TemplateRef<any>;
  /**
   * Element for the outlets region
   */
  @ContentChild('rightOutlets', { read: TemplateRef, static: false })
  rightOutlets: TemplateRef<any>;
  /**
  /**
   * Input that masks the screen when loading data if `true`
   */
  @Input() loaderShow;
  /**
   * Input that shows or hides the header
   */
  @Input() showHeader = true;
  /**
   * Input that shows or hides the footer
   */
  @Input() showFooter = true;
  /**
   * Input that create 2 screen partitions when loading data if `true`
   */
  @Input() displayNavigationRight;
  /**
   * Input of left screen Responsive config
   */
  @Input() leftResponsiveConfig;
  /**
   * Input of the right screen responsive config
   */
  @Input() rightResponsiveConfig;
  /**
   * Input of style
   */
  @Input() styleName;
}
