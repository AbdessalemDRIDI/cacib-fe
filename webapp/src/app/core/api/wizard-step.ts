import { MenuItem } from 'primeng/api';

/**
 * Represents a step in a wizard.
 */
export interface WizardStep extends MenuItem {
  /**
   * Indicates whether the step has been loaded.
   */
  loaded?: boolean;
}
