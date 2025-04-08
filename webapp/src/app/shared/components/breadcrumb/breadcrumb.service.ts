import { inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouteConfigLoadEnd, Router } from '@angular/router';
import { camelCase, upperFirst } from 'lodash';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, filter, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService implements OnDestroy {
  /**
   * Current breadcrumb item subject
   */
  private currentBreadCrumbItem$ = new BehaviorSubject<MenuItem>({});

  /**
   * BreadCrumbs subject to store the breadcrumb items
   */
  private breadCrumbItems$ = new BehaviorSubject<MenuItem[]>([]);

  /**
   * Destroy subject
   */
  private destroy$ = new Subject<boolean>();

  /**
   * Home link for the breadcrumb
   */
  homeLink: any;

  /**
   * injected services
   */
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  constructor() {
    this.initializeRouterSubscription();
  }
  /**
   * Get the breadcrumb items
   */
  getBreadcrumbItems(): Observable<any> {
    return this.breadCrumbItems$.asObservable();
  }
  /**
   * Initialize the home breadcrumb item
   */
  initHomeBreadcrumbItem(homeURL) {
    this.homeLink = homeURL;
    return {
      icon: 'pi pi-home',
      routerLink: homeURL ? homeURL : '/',
      command: () => this.clear(),
    };
  }
  /**
   * Initialize the router subscription
   */
  initializeRouterSubscription(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof RouteConfigLoadEnd || event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((_) => {
        const url = this.getURL(this.router.url);
        if (url !== this.homeLink && url !== '/') {
          const activeRouteData = this.getDeepsChildData(this.activeRoute);
          if (this.isBackNavigation(url)) {
            this.clearLastItem();
          } else {
            this.updateBreadcrumb({
              label: this.getBreadCrumbItemLabel(activeRouteData),
              routerLink: url,
              id: url,
              command: () => this.clearLastItems(url),
            });
          }
        }
      });
  }
  /**
   *Process the url to get the url without query params
   * @param url
   * @returns
   */
  getURL(url: string): string {
    const urlWithoutQueryParams = url.split('?')[0];
    return urlWithoutQueryParams;
  }
  /**
   *  Check if the navigation is back navigation
   * @param currentUrl
   * @returns
   */
  isBackNavigation(currentUrl): boolean {
    if (this.router.getCurrentNavigation()?.trigger === 'popstate') {
      const lastBreadCrumbItem =
        this.breadCrumbItems$.value[this.breadCrumbItems$.value.length - 2];
      return lastBreadCrumbItem?.routerLink === currentUrl;
    }
  }
  /**
   * Handle the back navigation
   * @param url
   */
  clearLastItem() {
    const breadcrumbs = [...this.breadCrumbItems$.value];
    breadcrumbs.pop();
    this.breadCrumbItems$.next(breadcrumbs);
  }

  /**
   * Get the breadcrumb Item  label
   */
  getBreadCrumbItemLabel(activeRouteData): string | undefined {
    const labelFromCurrentBreadCrumbItem = this.getLabelFromCurrentBreadCrumbItem(
      this.getURL(this.router.url),
      activeRouteData
    );
    if (labelFromCurrentBreadCrumbItem) {
      return labelFromCurrentBreadCrumbItem;
    }
    const labelFromRouteData = activeRouteData?.snapshot?.data?.labelName;
    if (labelFromRouteData) {
      return labelFromRouteData;
    }
    const labelFromUrl = this.router.url.endsWith('/')
      ? this.getURL(this.router.url)?.slice(0, -1).split('/').pop()
      : this.getURL(this.router.url)?.split('/').pop();
    if (labelFromUrl) {
      return upperFirst(camelCase(labelFromUrl));
    }
  }

  /**
   * Get the label from the selected breadcrumb item
   */
  getLabelFromCurrentBreadCrumbItem(
    url: string,
    activeRouteData: ActivatedRoute
  ): string | undefined {
    const currentValue = this.currentBreadCrumbItem$.value;
    const pathConfig = activeRouteData?.snapshot?.routeConfig?.path;
    return currentValue.routerLink === decodeURIComponent(url || '') ||
      pathConfig === currentValue?.state?.pathConfig
      ? currentValue?.label
      : undefined;
  }

  /**
   * Update the breadcrumb items
   * @param breadCrumbItem
   */
  updateBreadcrumb(breadCrumbItem: MenuItem): void {
    const routerLink = decodeURIComponent(breadCrumbItem.routerLink || '');
    breadCrumbItem = {
      ...breadCrumbItem,
      routerLink,
      id: routerLink,
    };
    const breadcrumbs = this.breadCrumbItems$.value;
    const urlExists = breadcrumbs.some(
      (breadcrumb) => breadcrumb.routerLink === breadCrumbItem?.routerLink
    );

    if (!urlExists) {
      this.breadCrumbItems$.next([...breadcrumbs, breadCrumbItem]);
    } else {
      const updatedBreadcrumbs = breadcrumbs.map((breadcrumb) =>
        breadcrumb?.routerLink === breadCrumbItem?.routerLink && !breadcrumb?.custom
          ? { ...breadcrumb, label: breadCrumbItem?.label }
          : breadcrumb
      );
      this.breadCrumbItems$.next(updatedBreadcrumbs);
    }
  }

  /**
   * Set the current breadcrumb item
   */
  setCurrentBreadCrumbItem(item: MenuItem): void {
    item = {
      ...item,
      routerLink: decodeURIComponent(this.getURL(item?.routerLink) || ''),
    };
    this.currentBreadCrumbItem$.next(item);
  }

  /**
   * Clear the last items from the breadcrumb
   * @param url
   */
  clearLastItems(url: string): void {
    const breadcrumbs = this.breadCrumbItems$.value;
    const selectedIndex = breadcrumbs.findIndex(
      (breadcrumb) => breadcrumb?.routerLink === decodeURIComponent(url)
    );
    if (selectedIndex !== -1) {
      const updatedBreadcrumbs = breadcrumbs.slice(0, selectedIndex + 1);
      this.breadCrumbItems$.next(updatedBreadcrumbs);
    }
  }

  /**
   *
   * @param route
   * @returns
   */
  getDeepsChildData(route: ActivatedRoute): ActivatedRoute {
    let activeRoute = route;
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }
    return activeRoute;
  }

  /**
   * Clear the breadcrumb
   */
  clear() {
    this.breadCrumbItems$.next([]);
  }
  /**
   * Add breadcrumb item
   *
   */
  addItem(item: MenuItem) {
    if (!item) {
      return;
    }
    item = {
      ...item,
      routerLink: decodeURIComponent(item?.routerLink || ''),
      id: decodeURIComponent(item.id || ''),
      custom: true,
      command: () => this.clearLastItems(item?.routerLink),
    };
    const itemExist = this.breadCrumbItems$.value?.some(
      (breadcrumb) => breadcrumb?.id === item?.id
    );
    if (!itemExist) {
      this.breadCrumbItems$.next([...this.breadCrumbItems$.value, item]);
    }
  }
  /**
   * Delete breadcrumb item
   */
  deleteItem(item: MenuItem) {
    if (!item) {
      return;
    }
    const breadCrumbItems = this.breadCrumbItems$.value;
    const updatedBreadcrumbs = breadCrumbItems?.filter(
      (breadcrumb) => breadcrumb?.id !== decodeURIComponent(item?.id || '')
    );
    this.breadCrumbItems$.next(updatedBreadcrumbs);
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
