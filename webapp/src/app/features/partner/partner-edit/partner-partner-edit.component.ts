import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  PartnerPartnerEditBaseComponent,
} from './partner-partner-edit.component-base';

/**
 * This component displays and manages a Reactive Form logic, all the logic and interaction with the UI are implemented
 * automatically in the PartnerPartnerEditBaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-partner-partner-edit',
  templateUrl: './partner-partner-edit.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class PartnerPartnerEditComponent extends PartnerPartnerEditBaseComponent implements OnInit {
  /**
   * Default Contructor
   */
  constructor(router: Router, activeRoute: ActivatedRoute) {
    super(router, activeRoute);
  }
  /**
   * Initialize the component after Angular first displays
   * the data-bound properties and sets the component's input properties
   */
  ngOnInit(): void {
    super.ngOnInit();
  }
}
