import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { LoaderService } from '@core/components/loaders/services/loader.service';
import { LoaderComponent } from './loader.component';

class MockLoaderService {
  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    setInterval(() => {
      this.loaderSubject.next(false);
    }, 50);
  }
}

describe('Component: LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [LoaderService],
    });

    TestBed.overrideComponent(LoaderComponent, {
      set: {
        providers: [{ provide: LoaderService, useClass: MockLoaderService }],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loaderService = fixture.debugElement.injector.get(LoaderService);
  });

  it('should use the MockLoaderService', () => {
    expect(loaderService).toBeTruthy();
    expect(loaderService instanceof MockLoaderService).toBeTruthy();
  });

  it('should hide the loader if the its show property is false', fakeAsync(() => {
    expect(component.show).toEqual(false);
    const loaderMaskElement = fixture.debugElement.query(By.css('.lmask'));
    expect(loaderMaskElement).toBeFalsy();
  }));

  it('should display a loader if the its show property is true', fakeAsync(() => {
    expect(component.show).toEqual(false);
    fixture.detectChanges();
    loaderService.show();
    expect(component.show).toEqual(true);
    const loaderMaskElement = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(loaderMaskElement).toBeTruthy();
    fixture.destroy();
    discardPeriodicTasks();
  }));

  it(' should subscribe to the LoaderService', () => {
    const spySubscribe = spyOn(loaderService.loaderState, 'subscribe').and.callThrough();
    expect(component['subscription']).toBeUndefined();
    fixture.detectChanges();
    expect(spySubscribe).toHaveBeenCalled();
    expect(component['subscription']).not.toBeUndefined();
  });

  it('should destroy the subscription when destroying', () => {
    const spySubscribe = spyOn(loaderService.loaderState, 'subscribe').and.callThrough();
    expect(component['subscription']).toBeUndefined();
    fixture.detectChanges();
    expect(spySubscribe).toHaveBeenCalled();
    expect(component['subscription']).not.toBeUndefined();
    component.ngOnDestroy();
    expect(component['subscription.closed']).toBeUndefined();
  });
});
