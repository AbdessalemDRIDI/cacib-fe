import { ComponentRef, ViewContainerRef } from '@angular/core';
import { get, set } from 'lodash';

/**
 * Creates a dynamic component and adds it to the specified container.
 *
 * @param componentImport - A promise that resolves to the imported module containing the component.
 * @param container - The ViewContainerRef where the component will be added.
 * @param data - Optional data to be passed to the component.
 * @param config - Optional configuration for the component.
 * @returns A promise that resolves when the component is created.
 * @throws An error if there is an error while creating the component.
 */
export async function createComponent(
  componentImpot: Promise<any>,
  container: ViewContainerRef,
  data?: any,
  config?: any
) {
  try {
    data?.loading.set(true);
    const module = await componentImpot;
    const component = module?.[Object.keys(module)[0]];
    container?.clear();
    const componentRef: ComponentRef<any> = container.createComponent(component);
    componentRef.instance.container = data.pContainer || container;
    if (data) {
      componentRef.instance.parentId = data.pId;
      componentRef.instance.roleName = data.rn;
      componentRef.instance.state = data.state;
      set(componentRef.instance, 'routeParams.params', data.pathParams);
      set(componentRef.instance, 'routeParams.queryParams', data.queryParams);
      // Merge the routeParams of the caller component with the existing routeParams
      // used for backword compatibility, after removing named auxiliary routes
      if (data.routeParams.queryParams) {
        set(componentRef.instance, 'routeParams.queryParams', {
          ...data.routeParams.queryParams,
          ...get(componentRef.instance, 'routeParams.queryParams', {}),
        });
        set(componentRef.instance, 'routeParams.params', {
          ...data.routeParams.params,
          ...get(componentRef.instance, 'routeParams.params', {}),
        });
      }
    }
    data?.loading.set(false);
  } catch (error) {
    data?.loading.set(false);
    throw new Error('Error while creating component', error);
  }
}
