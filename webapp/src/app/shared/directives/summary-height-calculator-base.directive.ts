import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive()
export class SummaryHeightCalculatorBaseDirective implements AfterViewInit, OnDestroy {
  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const summaryElement = this.el.nativeElement.querySelector('.vp-wizard-summary');
    if (summaryElement) {
      this.updateMargin(summaryElement.offsetHeight);

      this.resizeObserver = new ResizeObserver((entries) => {
        const newHeight = entries[0]?.contentRect.height;
        this.updateMargin(newHeight);
      });

      this.resizeObserver.observe(summaryElement);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private updateMargin(height: number) {
    const wizardContainer = this.el.nativeElement;
    if (wizardContainer) {
      wizardContainer.style.marginTop = height ? height - 20 + 'px' : '';
    }
  }
}
