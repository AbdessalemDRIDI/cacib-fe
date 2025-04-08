import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputInfoComponent } from './input-info.component';

describe('InputInfoComponent', () => {
  let component: InputInfoComponent;
  let fixture: ComponentFixture<InputInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display infoText based on input value', () => {
    component.infoText = 'some info text';
    fixture.detectChanges();

    const infoSpan = fixture.nativeElement.querySelector('.vp-input-info');
    expect(infoSpan.innerText).toEqual('some info text');
  });
});
