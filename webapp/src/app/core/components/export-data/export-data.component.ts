import { LowerCasePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccessibilityDirective } from '../../../shared/directives/accessibility.directive';
/**
 * This component exports the collection of items to a file of type XML, XLS, JSON or CSV
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    Button,
    OverlayPanelModule,
    PanelModule,
    AccessibilityDirective,
    SelectButtonModule,
    FormsModule,
    NgClass,
    LowerCasePipe,
  ],
})
export class ExportDataComponent {
  /**
   * The options like fileType, all or current fields
   */
  dataToExportOptions: any[];
  /**
   * The keys of the columns to export
   */
  keysOptions: any[];
  /**
   * The keys option to export, by default all keys
   */
  keys = 'All';
  /**
   * The data to export, by default the selected rows
   */
  dataToExport = 'Selected';
  /**
   * The supported files
   */
  availableFormats: string[] = ['XML2', 'Excel', 'CSV', 'Json'];

  /**
   * Closed exportButton
   */
  exportButton = false;

  /**
   * Event emitter that triggers when data is ready to be exported.
   *
   * @event
   * @type {EventEmitter<{ keys: string; dataToExport: any; format: string }>}
   * @property {string} keys - The keys of the data to be exported.
   * @property {any} dataToExport - The actual data to be exported.
   * @property {string} format - The format in which the data should be exported.
   */
  @Output() export = new EventEmitter<{ keys: string; dataToExport: any; format: string }>();

  @Input() label: string;

  @Input() icon: string;
  @Input() disabled: boolean;
  @ViewChild('op') op: OverlayPanel;

  constructor() {
    this.dataToExportOptions = [
      { label: $localize`:message;allLabel:All`, value: 'All' },
      {
        label: $localize`:message;selectedLabel:Selected`,
        value: 'Selected',
      },
    ];
    this.keysOptions = [
      { label: $localize`:message;allLabel:All`, value: 'All' },
      {
        label: $localize`:message;currentLabel:Current`,
        value: 'Current',
      },
    ];
  }

  /**
   * Exports data in the specified format.
   *
   * @param format - The format in which to export the data.
   *
   * Emits an event with the keys, data to export, and the specified format.
   * Toggles the export button state.
   */
  exportData(format) {
    this.export.emit({
      keys: this.keys,
      dataToExport: this.dataToExport,
      format: format,
    });
    this.exportButton = !this.exportButton;
  }

  /**
   * Gets the format
   * @param event
   * @param overlaypanel
   */
  retrieveFormats(event, overlaypanel) {
    this.exportButton = !this.disabled;
    this.exportButton ? overlaypanel.show(event) : overlaypanel.hide(event);
  }
}
