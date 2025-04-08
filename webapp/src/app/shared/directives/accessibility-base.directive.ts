import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import { setFocus } from '@app/core/utils';
import { FilterComponent } from '@palmyra/ng-palmyra';
import { AutoComplete } from 'primeng/autocomplete';
import { Calendar } from 'primeng/calendar';
import { Dialog } from 'primeng/dialog';
import { Dropdown } from 'primeng/dropdown';
import { Fieldset } from 'primeng/fieldset';
import { FileUpload } from 'primeng/fileupload';
import { MultiSelect } from 'primeng/multiselect';
import { Panel } from 'primeng/panel';
import { Password } from 'primeng/password';
import { SelectButton } from 'primeng/selectbutton';
import { ColumnFilter } from 'primeng/table';
import { TTCheckbox, TTHeaderCheckbox, TreeTableToggler } from 'primeng/treetable';
import { UniqueComponentId } from 'primeng/utils';
import { Subject, takeUntil } from 'rxjs';

Object.defineProperty(Panel.prototype, 'id', {
  get: function () {
    this._id = this._id || UniqueComponentId();
    return this._id;
  },
});

Object.defineProperty(Fieldset.prototype, 'id', {
  get: function () {
    this._id = this._id || UniqueComponentId();
    return this._id;
  },
});

Object.defineProperty(Fieldset.prototype, 'buttonAriaLabel', {
  get: function () {
    return this.legend || 'Collapse/Expand button';
  },
});

Object.defineProperty(ColumnFilter.prototype, 'toggleMenu', function () {
  this.overlayVisible = !this.overlayVisible;
  this.overlayId = this.overlayVisible ? UniqueComponentId() : undefined;
});

/**
 * Directive that handles PrimeNG components accessibility issues.
 */
@Directive()
export class AccessibilityBaseDirective implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>();
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Host() @Self() @Optional() private autoComplete: AutoComplete,
    @Host() @Self() @Optional() private dropdown: Dropdown,
    @Host() @Self() @Optional() private multiselect: MultiSelect,
    @Host() @Self() @Optional() private calendar: Calendar,
    @Host() @Self() @Optional() private selectButton: SelectButton,
    @Host() @Self() @Optional() private fileUpload: FileUpload,
    @Host() @Self() @Optional() private columnFilter: ColumnFilter,
    @Host() @Self() @Optional() private tTCheckbox: TTCheckbox,
    @Host() @Self() @Optional() private thTCheckbox: TTHeaderCheckbox,
    @Host() @Self() @Optional() private treeTableToggler: TreeTableToggler,
    @Host() @Self() @Optional() private dialog: Dialog,
    @Host() @Self() @Optional() private fieldset: Fieldset,
    @Host() @Self() @Optional() private FilterComponent: FilterComponent,
    @Host() @Self() @Optional() private password: Password
  ) {}

  ngOnInit() {
    if (this.autoComplete || this.multiselect || this.calendar || this.dropdown) {
      const component = this.autoComplete || this.multiselect || this.calendar || this.dropdown;
      component.overlayVisible =
        component.overlayVisible === undefined ? false : component.overlayVisible;
    }
    if (this.multiselect) {
      this.multiselect.onPanelHide.pipe(takeUntil(this.destroy$)).subscribe(() => {
        setFocus(this.el, 'input');
      });
    }
    if (this.autoComplete) {
      this.autoComplete.id = this.autoComplete.id || UniqueComponentId();
    }
    if (this.calendar) {
      this.calendar.inputId = this.calendar.inputId || UniqueComponentId();
      this.calendar.onClose.pipe(takeUntil(this.destroy$)).subscribe(() => {
        setFocus(this.el, 'button');
      });
      this.calendar.onShow.pipe(takeUntil(this.destroy$)).subscribe(() => {
        setFocus(this.calendar.contentViewChild, 'button');
      });
    }
    if (this.dropdown) {
      this.dropdown.id = this.dropdown.id || UniqueComponentId();
      if (this.dropdown?.editableInputViewChild) {
        this.renderer.setAttribute(
          this.dropdown?.editableInputViewChild?.nativeElement,
          'aria-label',
          this.dropdown.ariaLabel
        );
        setTimeout(() => {
          this.renderer.removeAttribute(
            this.dropdown?.editableInputViewChild?.nativeElement,
            'aria-expanded'
          );
        });
      }
    }
    if (this.columnFilter) {
      this.columnFilter.overlayId = undefined;
    }
  }
  ngAfterViewInit() {
    if (this.selectButton?.container) {
      setTimeout(() => {
        Array.from(
          this.selectButton?.container.nativeElement?.querySelectorAll('.p-ripple') || []
        ).forEach((el) => {
          this.renderer.removeAttribute(el, 'aria-pressed');
        });
      });
    }
    if (this.fileUpload) {
      Array.from(this.el.nativeElement.querySelectorAll('plusicon')).forEach((el) => {
        this.renderer.removeAttribute(el, 'aria-label');
      });
    }
    if (this.columnFilter) {
      this.columnFilter.icon?.nativeElement &&
        this.renderer.setAttribute(this.columnFilter.icon?.nativeElement, 'aria-label', 'Filter');
    }
    if (this.tTCheckbox || this.thTCheckbox) {
      const ttCheckbox = this.el.nativeElement.querySelector('.p-checkbox-box');
      const tthTCheckbox = this.el.nativeElement.querySelector('.p-hidden-accessible > input');
      this.renderer.setAttribute(ttCheckbox, 'aria-label', 'Check row');
      this.renderer.setAttribute(tthTCheckbox, 'aria-label', 'Check row');
    }
    if (this.treeTableToggler) {
      const ttToggler = this.el.nativeElement.querySelector('.p-treetable-toggler');
      ttToggler && this.renderer.setAttribute(ttToggler, 'aria-label', 'Toggle row');
    }

    if (this.dialog) {
      const maximizeButton = this.el.nativeElement.querySelector('.p-dialog-header-maximize');
      const closeBtton = this.el.nativeElement.querySelector('.p-dialog-header-close');
      maximizeButton && this.renderer.setAttribute(maximizeButton, 'aria-label', 'Maximize dialog');
      closeBtton && this.renderer.setAttribute(closeBtton, 'aria-label', 'Close dialog');
    }
    if (this.fieldset) {
      if (!this.fieldset.toggleable && this.fieldset.legend) {
        const legend = this.el.nativeElement.querySelector('.p-fieldset-legend-text');
        legend && this.renderer.setAttribute(legend, 'tabindex', '0');
        legend && this.renderer.setAttribute(legend, 'aria-label', this.fieldset.legend);
      } else {
        const dynamicHeader = this.el.nativeElement.querySelector('.vp-group-dynamiclabel');
        const legentAriaLabel = Array.from(
          dynamicHeader?.querySelectorAll('.vp-group-dynamiclabel > span') || []
        )
          .map((el: any) => el.getAttribute('aria-label') || '')
          .join(' ');
        if (dynamicHeader && legentAriaLabel) {
          !this.fieldset.toggleable && this.renderer.setAttribute(dynamicHeader, 'tabindex', '0');
          Object.defineProperty(this.fieldset, 'buttonAriaLabel', {
            get: function () {
              return '';
            },
          });
        }
      }
    }
    if (this.FilterComponent) {
      Array.from(this.el.nativeElement.querySelectorAll('.p-hidden-focusable')).forEach(
        (el: HTMLElement) => {
          this.renderer.removeAttribute(el, 'tabindex');
        }
      );
    }
    if (this.password) {
      this.renderer.setAttribute(this.password.el.nativeElement, 'role', 'textbox');
      const inputPassword = this.el.nativeElement.querySelector('.p-password-input');
      if (inputPassword) {
        this.renderer.setAttribute(inputPassword, 'aria-label', 'password');
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
