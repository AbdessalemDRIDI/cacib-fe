import { state, style, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { COMPONENT_IMPORTS, COMPONENT_PROVIDERS, MainBaseComponent } from './home.component-base';
/**
 * The home page that displays the main structure of your desktop & mobile application once the user is logged in like the `Main menu`, `header`, `main body` and `footer`.
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('workspace-animation', [
      state(
        'collapsed',
        style({
          transform: 'translateY(0px) perspective(10px) rotateX(1deg)',
        })
      ),
      state(
        'expanded',
        style({
          transform: 'translateY(-120px) perspective(10px) rotateX(1deg)',
        })
      ),
    ]),
  ],
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class MainComponent extends MainBaseComponent implements OnInit, AfterViewInit, OnDestroy {
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
  /**
   * Cleanup just before Angular destroys the component.
   * Unsubscribe Observables and detach event handlers to avoid memory leaks
   */
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
