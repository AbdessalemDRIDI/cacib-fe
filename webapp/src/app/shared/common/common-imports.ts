// organize-imports-ignore
import { AsyncPipe, CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AccessibilityDirective } from '../directives/accessibility.directive';
import { ValidatorComponent } from '../components/validator/validator.component';
import { PrimeTemplate } from 'primeng/api';
import { HideColumnDirective } from '../directives/hide-column.directive';
import { CellDirective } from '../directives/cell.directive';
import { OperatorPipe } from '../pipes/operator.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PalmyraTemplateDirective } from '../directives/palmyra-template.directive';
import { BusinessDateDirective } from '../directives/business-date.directive';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { NumberFormatterDirective } from '../directives/number.directive';
import { CurrencyFormatterDirective } from '../directives/currency.directive';
import { ActionPolicyDirective } from '../directives/action-policy.directive';
import { SummaryHeightCalculatorDirective } from '../directives/summary-height-calculator.directive';
import { NumberPipe } from '../pipes/number.pipe';
import { ArrayFormFilterPipe } from '../pipes/filter-arrayform.pipe';
import { TranslateEnumPipe } from '../pipes/translate-enum.pipe';
import { TranslatePrimengPipe } from '../pipes/translate-primeng.pipe';
import { CustomCurrencyPipe } from '../pipes/currency.pipe';
import { GridPipe } from '../pipes/grid.pipe';
import { KebabCasePipe } from '../pipes/kebabcase.pipe';
import { DynamicValuesPipe } from '../pipes/dynamic-values.pipe';
import { ScreenDialogComponent } from '../components/screen-dialog/screen-dialog.component';
import { DateFormatDirective } from '../directives/dateFormat.directive';
import { SeparatorPipe } from '../pipes/separator.pipe';
import { IsVisibleByRoleDirective } from '../directives/visible-by-role.directive';
import { TextareaDirective } from '../directives/text-area.directive';
import { ChartComponent } from '../components/chart/chart.component';
import { InputHelpComponent } from '../components/input-help/input-help.component';
import { InputInfoComponent } from '../components/input-info/input-info.component';
import { VirtualScrollComponent } from '../components/virtual-scroll/virtual-scroll.component';
import { GroupedToggleButtonComponent } from '../components/grouped-toggle-button/grouped-toggle-button.component';
import { CustomTTselectableRowDirective } from '../directives/custom-tt-selectable-row.directive';
import { ScreenComponent } from '@app/core/components/screen/screen/screen.component';
import { ExportDataComponent } from '@app/core/components/export-data/export-data.component';
import { FormatSize } from '../pipes/format-size.pipe';
import { CUSTOM_COMMON_IMPORTS } from './custom-common-imports';
// palmyra-needle-angular-library-import Palmyra will add import angular library module here
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';
import { StepsModule } from 'primeng/steps';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { PrimengExtensionModule } from '@palmyra/ng-palmyra';

/**
 * This file, serves as a centralized location for importing commonly used modules, components, directives, and pipes across the application.
 * It helps in maintaining clean and organized import statements in other parts of the application by providing a single point of reference.
 *
 * This file simplifies the management of imports throughout the application, ensuring that components, directives, and pipes can be easily reused without the need to import them individually in every file.
 *
 * Custom Import:
 * - `CUSTOM_COMMON_IMPORTS`: An array imported from `./custom-common-imports`, likely containing additional custom or third-party modules and components specific to the application's needs.
 *
 * Exported Array (`COMMON_IMPORTS`):
 * This array combines `CUSTOM_COMMON_IMPORTS` with a predefined set of common imports, including both PrimeNG modules listed above and other essential Angular modules, components, directives, and pipes. This array is intended for use throughout the application to ensure consistency and reduce redundancy in import statements.
 *
 * The inclusion of `CUSTOM_COMMON_IMPORTS` at the beginning of the `COMMON_IMPORTS` array allows for easy extension and customization of common imports without modifying this core file directly.
 */
export const COMMON_IMPORTS = [
  ...CUSTOM_COMMON_IMPORTS,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  DatePipe,
  RouterOutlet,
  AccessibilityDirective,
  ValidatorComponent,
  PrimeTemplate,
  HideColumnDirective,
  CellDirective,
  OperatorPipe,
  DragDropModule,
  PalmyraTemplateDirective,
  BusinessDateDirective,
  DateFormatPipe,
  NumberFormatterDirective,
  CurrencyFormatterDirective,
  ActionPolicyDirective,
  SummaryHeightCalculatorDirective,
  NumberPipe,
  ArrayFormFilterPipe,
  TranslateEnumPipe,
  TranslatePrimengPipe,
  CustomCurrencyPipe,
  GridPipe,
  KebabCasePipe,
  DynamicValuesPipe,
  ScreenDialogComponent,
  DateFormatDirective,
  SeparatorPipe,
  IsVisibleByRoleDirective,
  TextareaDirective,
  ChartComponent,
  InputHelpComponent,
  InputInfoComponent,
  VirtualScrollComponent,
  GroupedToggleButtonComponent,
  CustomTTselectableRowDirective,
  ScreenComponent,
  ExportDataComponent,
  AsyncPipe,
  NgClass,
  FormatSize,
  // palmyra-needle-angular-library-export Palmyra will add import angular library module here
  AccordionModule,
  CardModule,
  OverlayPanelModule,
  ContextMenuModule,
  PanelMenuModule,
  MenubarModule,
  MessageModule,
  InputTextareaModule,
  SplitButtonModule,
  InputSwitchModule,
  SelectButtonModule,
  SidebarModule,
  FieldsetModule,
  ConfirmDialogModule,
  AutoCompleteModule,
  MultiSelectModule,
  PaginatorModule,
  DialogModule,
  DropdownModule,
  TabViewModule,
  PanelModule,
  ToggleButtonModule,
  FileUploadModule,
  PasswordModule,
  SliderModule,
  InputTextModule,
  InputMaskModule,
  Button,
  CalendarModule,
  KeyFilterModule,
  CheckboxModule,
  RadioButtonModule,
  TableModule,
  ChartModule,
  TooltipModule,
  DataViewModule,
  SlideMenuModule,
  ToastModule,
  TreeTableModule,
  StepsModule,
  VirtualScrollerModule,
  PrimengExtensionModule,
];
