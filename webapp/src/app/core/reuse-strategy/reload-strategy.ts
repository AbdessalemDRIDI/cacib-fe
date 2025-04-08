import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/**
 * A custom route reuse strategy that determines whether a route should be reused, stored, retrieved, detached, or reattached.
 * This implementation is useful for controlling the behavior of route reuse in an Angular application.
 */
/**
 * This class implements the RouteReuseStrategy to control the reuse of routes.
 * It is used to reinstantiate a component when a query parameter or route parameter is changed.
 */
export class ReloadStrategy implements RouteReuseStrategy {
  /**
   * Determines whether a route should be reused based on the future and current route snapshots.
   *
   * This method compares the route configuration, route parameters, and query parameters
   * of the future and current route snapshots to decide if the route should be reused.
   *
   * @param future - The future route snapshot.
   * @param curr - The current route snapshot.
   * @returns A boolean indicating whether the route should be reused.
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return (
      future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params) &&
      JSON.stringify(future.queryParams) === JSON.stringify(curr.queryParams)
    );
  }

  /**
   * Stores the detached route handle for later reuse.
   *
   * @param route - The current route snapshot.
   * @param handle - The detached route handle, or null if there is no handle.
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    // Default behavior
  }

  /**
   * Retrieves the detached route handle for reuse.
   *
   * @param route - The current route snapshot.
   * @returns The detached route handle, or null if there is no handle.
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null; // Default behavior
  }

  /**
   * Determines if this route should be detached from the route reuse strategy.
   *
   * @param route - The current route snapshot.
   * @returns A boolean indicating whether the route should be detached.
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false; // Default behavior
  }

  /**
   * Determines if this route should be reattached to the route reuse strategy.
   *
   * @param route - The current route snapshot.
   * @returns A boolean indicating whether the route should be reattached.
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false; // Default behavior
  }
}
