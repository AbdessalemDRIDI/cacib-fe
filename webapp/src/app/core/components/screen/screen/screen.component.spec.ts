import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoaderMaskComponent } from '../../loaders/loader-mask/loader-mask.component';
import { FooterScreenComponent } from '../footer-screen/footer-screen.component';
import { HeaderScreenComponent } from '../header-screen/header-screen.component';
import { ScreenComponent } from './screen.component';

describe('ScreenComponent', () => {
  let component: ScreenComponent;
  let fixture: ComponentFixture<ScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ScreenComponent, LoaderMaskComponent, FooterScreenComponent, HeaderScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
