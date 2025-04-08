import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FooterScreenComponent } from './footer-screen.component';

describe('FooterScreenComponent', () => {
  let component: FooterScreenComponent;
  let fixture: ComponentFixture<FooterScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FooterScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
