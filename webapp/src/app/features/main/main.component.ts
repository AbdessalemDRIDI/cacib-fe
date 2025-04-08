import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
/**
 * Main feature component that handles the routing of all the available features
 */
@Component({
  template: ` <router-outlet (activate)="onActivate($event)" class="feature"></router-outlet> `,
  standalone: true,
  imports: [RouterOutlet],
})
export class MainComponent {
  breadcrumbService = inject(BreadcrumbService);
  router = inject(Router);
  /**
   * The activate event to retrive and set the current breadcrumb item from the activated component
   * @param componentInstance
   */
  onActivate(componentInstance: any) {
    const routerLink = this.router.url;
    const label = componentInstance.getBreadcrumbLabel && componentInstance?.getBreadcrumbLabel();
    this.breadcrumbService.setCurrentBreadCrumbItem({
      label,
      routerLink,
      state: {
        pathConfig: componentInstance?.activeRoute?.snapshot?.routeConfig?.path,
      },
    });
  }
}
