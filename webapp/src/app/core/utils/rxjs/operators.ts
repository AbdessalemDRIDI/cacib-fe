import { isEqual } from 'lodash';
import { distinctUntilChanged, filter, pipe } from 'rxjs';

export const untilChanged = pipe(filter(Boolean), distinctUntilChanged(isEqual));
