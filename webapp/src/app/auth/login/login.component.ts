import { AfterViewInit, Component, OnInit } from '@angular/core';

import { COMPONENT_IMPORTS, COMPONENT_PROVIDERS, LoginBaseComponent } from './login.component-base';
/**
 * Component that handles the user authentication and logout
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 * */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class LoginComponent extends LoginBaseComponent implements OnInit, AfterViewInit {
  /**
   * Initialize the component after Angular first displays
   * the data-bound properties and sets the component's input properties
   */
  ngOnInit() {
    super.ngOnInit();
  }
  /***
   * Respond after Angular initializes the component's views and child views
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
