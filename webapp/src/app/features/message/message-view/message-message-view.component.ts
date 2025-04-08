import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  MessageMessageViewBaseComponent,
} from './message-message-view.component-base';
/**
 * This component visualizes an object data., all the logic and interaction with the UI are implemented
 * automatically in the MessageMessageViewBaseComponent.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({
  selector: 'app-message-message-view',
  templateUrl: './message-message-view.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class MessageMessageViewComponent extends MessageMessageViewBaseComponent implements OnInit {
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
