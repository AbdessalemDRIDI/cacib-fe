import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HideColumnDirective } from './hide-column.directive';

@Component({
  template: `<tr>
    <td [selectedColumns]="selectedColumns" class="first-column" hideColumn="rib">
      <span class="ui-column-title"></span>
      1002
    </td>
    <td [selectedColumns]="selectedColumns" class="second-column" hideColumn="accountType">
      <span class="ui-column-title"></span>
      Gold
    </td>
  </tr>`,
  standalone: true,
  imports: [TestHideColumnComponent, HideColumnDirective],
})
class TestHideColumnComponent {
  selectedColumns = [
    { field: 'rib', width: '100px', name: 'Rib' },
    { field: 'accountType', width: '100px', name: 'AccountType' },
  ];
}

describe('Directive: HideColumnDirective', () => {
  let fixture: ComponentFixture<TestHideColumnComponent>;
  let component: TestHideColumnComponent;
  let firstColumn, secondElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHideColumnComponent, HideColumnDirective],
    });
    fixture = TestBed.createComponent(TestHideColumnComponent);
    component = fixture.componentInstance;
    firstColumn = fixture.debugElement.query(By.css('.first-column'));
    secondElement = fixture.debugElement.query(By.css('.second-column'));
  });

  describe('hide column', () => {
    it('should display all columns the value from the control', () => {
      fixture.detectChanges();
      expect(firstColumn.nativeElement.style.display).toBe('table-cell');
      expect(secondElement.nativeElement.style.display).toBe('table-cell');
    });
    it('should hide the  accountType column', () => {
      component.selectedColumns = [{ field: 'rib', width: '100px', name: 'Rib' }];
      fixture.detectChanges();
      expect(firstColumn.nativeElement.style.display).toBe('table-cell');
      expect(secondElement.nativeElement.style.display).toBe('none');
    });
  });
});
