import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  MessageMessageSearchInputBaseComponent,
} from './message-message-search-input.component-base';
/**
 * This component displays and manages a Reactive Filters Form logic. It is mainly used with a `search` screen.
 * All the logic and interaction with the UI are implemented automatically in the MessageMessageSearchInputBaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-message-message-search-input',
  templateUrl: './message-message-search-input.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class MessageMessageSearchInputComponent
  extends MessageMessageSearchInputBaseComponent
  implements OnInit
{
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
