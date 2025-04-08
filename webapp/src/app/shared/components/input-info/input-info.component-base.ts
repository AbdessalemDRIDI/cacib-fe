import { Component, Input } from '@angular/core';

export const COMPONENT_PROVIDERS = [];
export const COMPONENT_IMPORTS = [];

/**
 * This is a Generic Component that display info text
 * under an input field
 */

@Component({ template: '' })
export class InputInfoComponentBase {
  @Input() infoText: string;
}
