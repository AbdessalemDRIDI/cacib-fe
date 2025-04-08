import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule } from 'primeng/dialog';

import { FeatureService } from '@app/core/services/feature/feature.service';
import { ScreenDialogComponent } from './screen-dialog.component';

describe('ScreenDialogComponent', () => {
  let component: ScreenDialogComponent;
  let fixture: ComponentFixture<ScreenDialogComponent>;
  const mockFeatureService = jasmine.createSpyObj('FeatureService', ['setFocus']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DialogModule, RouterTestingModule, BrowserAnimationsModule, ScreenDialogComponent],
      providers: [
        { provide: Location, useValue: {} },
        { provide: FeatureService, useValue: mockFeatureService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
