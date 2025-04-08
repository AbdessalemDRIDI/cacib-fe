import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit avatarClick event when avatar is clicked', () => {
    spyOn(component.avatarClick, 'emit');

    const avatarElement = fixture.debugElement.query(
      By.css('.menu-avatar-container')
    ).nativeElement;
    avatarElement.click();

    expect(component.avatarClick.emit).toHaveBeenCalled();
  });
});
