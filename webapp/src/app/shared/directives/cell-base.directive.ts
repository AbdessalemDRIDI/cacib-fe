import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
/**
 * Directive that displays a tooltip on truncated cell's content
 *
 * This class should not be modified.
 */
@Directive()
export class CellBaseDirective {
  private e: HTMLInputElement;
  @Output() mouseOverCell = new EventEmitter<boolean>();
  private tooltip = inject(Tooltip, { host: true });

  constructor(private elementRef: ElementRef) {
    this.e = this.elementRef.nativeElement;
    this.setTooltipState(true);
  }

  @HostListener('mouseover', ['$event.target'])
  onMouseOver(td) {
    if (this.e.offsetWidth < this.e.scrollWidth) {
      this.mouseOverCell.emit(false);
      this.setTooltipState(false);
    }
  }

  @HostListener('mouseout', ['$event.target'])
  onMouseOut(td) {
    if (this.e.offsetWidth < this.e.scrollWidth) {
      this.mouseOverCell.emit(true);
      this.setTooltipState(true);
    }
  }

  setTooltipState(disabled = true) {
    if (this.tooltip) {
      this.tooltip.disabled = disabled;
      this.tooltip.setOption({ disabled });
    }
  }
}
