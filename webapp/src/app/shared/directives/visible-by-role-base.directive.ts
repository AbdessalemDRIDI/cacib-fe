import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PolicyService } from '@app/core/services/policy/policy.service';

@Directive()
export class IsVisibleByRoleBaseDirective {
  @Input() isVisibleByRole: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private policyService: PolicyService
  ) {}

  /**
   * Checks if the user has the necessary role to display the element.
   */
  ngOnInit() {
    let context = this.policyService.keysExtractor(this.isVisibleByRole);

    if (
      !this.policyService.isComponentGranted(context.feature, context.screen, context.component)
    ) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
