import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoaderMaskComponent } from '@core/components/loaders/loader-mask/loader-mask.component';

describe('Component: LoaderMaskComponent', () => {
  let component: LoaderMaskComponent;
  let fixture: ComponentFixture<LoaderMaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LoaderMaskComponent],
    });

    TestBed.overrideComponent(LoaderMaskComponent, {}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderMaskComponent);
    component = fixture.componentInstance;
  });

  it('should hide the loader if the its show property is false', fakeAsync(() => {
    expect(component.show).toEqual(false);
    const loaderMaskElement = fixture.debugElement.query(By.css('.vp-spinner'));
    expect(loaderMaskElement).toBeFalsy();
  }));

  it('should display a loader if the its show property is true', fakeAsync(() => {
    expect(component.show).toEqual(false);
    component.show = true;
    fixture.detectChanges();
    const loaderMaskElement = fixture.debugElement.query(By.css('.vp-spinner'));
    expect(loaderMaskElement).toBeTruthy();
    fixture.destroy();
  }));
});
