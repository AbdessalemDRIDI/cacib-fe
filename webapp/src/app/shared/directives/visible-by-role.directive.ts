import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { PolicyService } from '@app/core/services/policy/policy.service';
import { IsVisibleByRoleBaseDirective } from './visible-by-role-base.directive';
/**
 * You can override the SummaryHeight directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[isVisibleByRole]',
  standalone: true,
})
export class IsVisibleByRoleDirective extends IsVisibleByRoleBaseDirective {
  constructor(
    templateRef: TemplateRef<any>,
    viewContainer: ViewContainerRef,
    policyService: PolicyService
  ) {
    super(templateRef, viewContainer, policyService);
  }
}
