import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { Tooltip, TooltipModule } from 'primeng/tooltip';

export const COMPONENT_PROVIDERS = [];
export const COMPONENT_IMPORTS = [TooltipModule];

/**
 * This is a Generic Component that display a help icon with a tooltip
 * next to an input field's label
 */

@Component({ template: '' })
export class InputHelpComponentBase {
  @Input() iconClass: string = 'pi pi-question-circle';
  @Input() tooltipText: string;
  @ViewChild(Tooltip) tooltip: Tooltip;
  showTooltip(event) {
    event.preventDefault();
    this.tooltip.activate();
  }
  @HostListener('document:touchstart', ['$event'])
  hideTooltip(event) {
    event.stopPropagation();
    this.tooltip.deactivate();
  }
}
