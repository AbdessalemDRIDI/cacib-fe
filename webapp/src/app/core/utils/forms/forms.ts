import {
  AbstractControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { camelCase, get, isEqual, set , omit  } from 'lodash';

/**
 * Validate the form fields
 * @param formGroup
 * @returns {void}
 */
export function validateForm(formGroup: UntypedFormGroup): void {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);
    if (control instanceof UntypedFormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof UntypedFormGroup) {
      validateForm(control);
    } else if (control instanceof UntypedFormArray) {
      (control as UntypedFormArray).controls.forEach((group) =>
        validateForm(group as UntypedFormGroup)
      );
    }
  });
}

/**
 * Patches only the distincts form values with the provided data object as input param
 * @param data
 * @param form
 */
export function patchValue(data: any, form: UntypedFormGroup) {
  Object.keys(data).forEach((key) => {
    const formControl = form.controls[key];
    if (formControl && (!formControl.value || !isEqual(data[key], formControl.value))) {
      form.controls[key].patchValue(data[key], {
        onlySelf: true,
        emitEvent: true,
      });
    }
  });
  form.updateValueAndValidity();
}

/**
 * Set the value of each field in the data
 * @param data
 * @param item
 * @param value
 * */
export function setFieldValue(data: any, item: any, value: any) {
  if (item.indexOf('.') != -1) {
    get(value, camelCase(item.split('.').join(' '))) != null &&
      get(value, camelCase(item.split('.').join(' '))) != undefined &&
      set(data, item, value[camelCase(item)]);
  } else {
    ((get(value, camelCase(item)) != null && get(value, camelCase(item)) != undefined) ||
      Object.values(value).every((val: any) => get(value, val) == null)) &&
      set(data, item, value[camelCase(item)]);
  }
}

/**
 * Patches only the filtred value to avoid undefined
 * @param form
 * @param data
 * */
export function patchFiltersValue(form: UntypedFormGroup, data: any) {
  if (!data) return;
  const dataToPatch = Object.keys(data).reduce((result, item) => {
    const itemValue = get(data, item);
    if (itemValue) {
      result[item] = itemValue;
    }
    return result;
  }, {});
  form.patchValue(dataToPatch, { emitEvent: false });
}
/**
 * Patch the default criteria into the form
 * @param queryParams
 * @param data
 * @param keys
 * @param form
 * */
export function patchDefaultValues(criteria, data, form) {
  if (criteria) {
    const regex = /(==|!=|>=|<=|~|>|<)/gi;
    criteria.split('&').forEach((subCriteria) => {
      let values = subCriteria.split('|');
      values.forEach((item, index) => {
        values[index] = item.split(regex)[2].trim().replaceAll("'", '').replaceAll('"', '');
        let finalValue = values[index];
        const operator = item.split(regex)[1].trim().replaceAll("'", '');
        const operatorName = `${camelCase(subCriteria.split(regex)[0].trim())}Operator`;
        try {
          finalValue = values[index].startsWith('[') ? JSON.parse(values[index]) : values[index];
        } catch (e) {
          finalValue = values[index].split('[')[1].split(']')[0].split(',');
        }
        if (!Array.isArray(finalValue) && (finalValue == 'true' || finalValue == 'false')) {
          finalValue = finalValue === 'true';
        }
        set(data, camelCase(subCriteria.split(regex)[0].trim()), finalValue);
        set(data, operatorName, operator);
      });
    });
    patchFiltersValue(form, data);
  }
}

export function /**
 * Deep clones the given AbstractControl, preserving values, validators, async validators, and disabled status.
 * @param control AbstractControl
 * @returns AbstractControl
 */
cloneAbstractControl<T extends AbstractControl>(control: T): T {
  let newControl: T;
  if (control instanceof UntypedFormGroup) {
    const formGroup = new UntypedFormGroup({}, control.validator, control.asyncValidator);
    const controls = control.controls;
    Object.keys(controls).forEach((key) => {
      formGroup.addControl(key, cloneAbstractControl(controls[key]));
    });
    newControl = formGroup as any;
  } else if (control instanceof UntypedFormArray) {
    const formArray = new UntypedFormArray([], control.validator, control.asyncValidator);
    control.controls.forEach((formControl) => formArray.push(cloneAbstractControl(formControl)));
    newControl = formArray as any;
  } else if (control instanceof UntypedFormControl) {
    newControl = new UntypedFormControl(
      control.value,
      control.validator,
      control.asyncValidator
    ) as any;
  } else {
    throw new Error('Error: unexpected control value');
  }
  if (control.disabled) newControl.disable({ emitEvent: false });
  return newControl;
}

/**
 * Get the Root FormGroup from the provided child control
 * @param control
 * @returns {AbstractControl}
 */
export function getRootFormGroup(control: AbstractControl): AbstractControl {
  let formGroup = control;
  while (formGroup && !(formGroup instanceof FormGroup)) {
    formGroup = formGroup.parent as FormGroup;
  }
  return formGroup;
}

/**
 * Disables or enables a form control based on a condition.
 * @param condition - The condition to check.
 * @param fieldName - The name of the form control field.
 * @param form - The FormGroup instance.
 */
export function disableFormControl(condition: boolean, fieldName: string, form: FormGroup) {
  const controlField = form.get(fieldName);
  if (condition !== true && controlField?.enabled) {
    controlField?.disable({ emitEvent: true });
  } else if (condition && controlField?.disabled) {
    controlField?.enable({ emitEvent: true });
  }
}
/**
 * Removes one or more controls from the form group.
 * 
 * @param {UntypedFormGroup} formGroup - The form group from which to remove the controls.
 * @param {string | string[]} controlNames - The name(s) of the control(s) to remove.
 * @param {any} [data] - Optional data object from which to remove the control properties.
 * @returns {any} - The updated data object with the specified controls removed.
 */
export function removeControl(formGroup: UntypedFormGroup, controlNames: string | string[],data?:any): any {
  const controls = Array.isArray(controlNames) ? controlNames : [controlNames];
  controls.forEach(controlName => {
    if (formGroup.contains(controlName)) {
      formGroup.removeControl(controlName);
    }
    if (data && data[controlName]) {
      data = omit(data, [controlName]);
    }
  });
  return data;
}
/**
 * Checks if the form is empty
 * @param {FormGroup} form - The form group to check
 * @return {boolean} - Returns true if the form is empty, otherwise false
 */
export function isFormEmpty(form: UntypedFormGroup): boolean {
  if (!form) {
    return true;
  }
  if (form instanceof UntypedFormControl) {
    return form.value === '' || form.value === null;
  }
  return Object.values(form.controls).every((control: any) => {
    if (control instanceof UntypedFormControl) {
      return control.value === '' || control.value === null;
    } else if (control instanceof UntypedFormGroup) {
      return isFormEmpty(control);
    } else if (control instanceof UntypedFormArray) {
      return (control as UntypedFormArray).controls.every((group) =>
        isFormEmpty(group as UntypedFormGroup)
      );
    }
    return true;
  });
}