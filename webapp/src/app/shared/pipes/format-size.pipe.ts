import { Pipe, PipeTransform } from '@angular/core';
import { formatSize } from '@app/core/utils';

/**
 * A custom pipe that formats the given value into a human-readable size string.
 */
@Pipe({
  name: 'formatSize',
  standalone: true,
})
export class FormatSize implements PipeTransform {
  /**
   * Transforms the given value into a formatted string representing the size.
   *
   * @param value - The value to be transformed.
   * @returns The formatted size string.
   */
  transform(value: any): string {
    return formatSize(value);
  }
}
