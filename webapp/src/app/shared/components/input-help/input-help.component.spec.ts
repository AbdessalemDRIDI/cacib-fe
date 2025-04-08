import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputHelpComponent } from './input-help.component';

describe('InputHelpComponent', () => {
  let component: InputHelpComponent;
  let fixture: ComponentFixture<InputHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputHelpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default iconClass if no input value is provided', () => {
    expect(component.iconClass).toEqual('pi pi-question-circle');
  });

  it('should display iconClass and tooltipText based on input values', () => {
    component.iconClass = 'fa fa-info-circle';
    fixture.detectChanges();

    const helpIcon = fixture.debugElement.nativeElement.querySelector('.vp-help-icon');
    expect(helpIcon.classList).toContain('fa');
  });
});
