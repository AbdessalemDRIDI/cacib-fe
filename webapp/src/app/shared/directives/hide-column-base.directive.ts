import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
/**
 * Directive that hides a column.
 *
 * This class should not be modified.
 */
@Directive()
export class HideColumnBaseDirective implements OnChanges {
  /**
   * The column name
   */
  @Input('hideColumn') column: string;
  /**
   * The current selected columns
   */
  @Input() selectedColumns;

  constructor(private el: ElementRef) {}
  /**
   * Hides the column
   */
  ngOnChanges() {
    if (
      this.selectedColumns &&
      this.column &&
      !this.selectedColumns.find((col) => col['field'] === this.column)
    ) {
      this.el.nativeElement.style.display = 'none';
    } else {
      this.el.nativeElement.style.display = 'table-cell';
    }
  }
}
