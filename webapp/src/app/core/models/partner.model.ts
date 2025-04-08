/**
 * Represents the structure of an Partner within the application.
 * This interface is used to define the properties that an Partner object should have.
 */
export interface Partner {
  id?: number;
  alias?: string;
  type?: string;
  direction?: string;
  application?: string;
  processedFlowType?: string;
  description?: string;
}
