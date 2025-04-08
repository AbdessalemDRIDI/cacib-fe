import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';

import { PalmyraTemplateDirective } from '@shared/directives/palmyra-template.directive';
/**
 * The top header region used in the home page
 *
 * This class should not be modified.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterContentInit {
  /**
   * Elements of the header's templates
   */
  @ContentChildren(PalmyraTemplateDirective) templates: QueryList<PalmyraTemplateDirective>;
  /**
   * Element of the left region
   */
  leftTemplate: TemplateRef<any>;
  /**
   * Element of the right region
   */
  rightTemplate: TemplateRef<any>;
  /**
   * Element of the center region
   */
  centerTemplate: TemplateRef<any>;
  /**
   * Initiliazes the templates after content rendering
   */
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'leftHeader':
          this.leftTemplate = item.template;
          break;
        case 'centerHeader':
          this.centerTemplate = item.template;
          break;
        default:
          this.rightTemplate = item.template;
          break;
      }
    });
  }
}
