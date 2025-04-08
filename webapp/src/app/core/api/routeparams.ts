/**
 * Represents the route parameters for a specific route.
 */
export interface RouteParams {
  /**
   * The query parameters for the route.
   */
  queryParams: { [key: string]: any };

  /**
   * The path parameters for the route.
   */
  params: { [key: string]: any };
}
