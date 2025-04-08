import { Injectable } from '@angular/core';
import { cloneDeep, get, isEqual, set } from 'lodash';
import { BehaviorSubject, distinctUntilChanged, map, Subject } from 'rxjs';

export interface SharedData {
  senderId?: string;
  parentId?: string;
  data?: any | any[];
  keyToUpdate?: string;
}

@Injectable({ providedIn: 'root' })
export class ShareDataService {
  private sharedData: { [key: string]: SharedData } = {};
  private sharedData$ = new BehaviorSubject<{ [key: string]: SharedData }>({});
  private refreshScreenData$ = new Subject();

  /**
   * Retrieves data from the sharedData$ observable based on the provided screenId and optional path.
   * @param screenId - The identifier of the screen.
   * @param path - Optional path to access nested data within the screen's data object.
   * @returns An observable that emits the requested data.
   */
  getData(screenId: string, path?: string) {
    return this.sharedData$.asObservable().pipe(
      map((sharedData) => sharedData[screenId]),
      map((sharedData) => {
        return cloneDeep(path ? get(sharedData?.data, path) : sharedData?.data);
      }),
      distinctUntilChanged(isEqual)
    );
  }

  /**
   * Shares data with a specific screen identified by `screenId`.
   * If the shared data is different from the existing data for the screen, it updates the shared data and emits the updated data.
   *
   * @param sharedData - The data to be shared.
   * @param screenId - The identifier of the screen to share the data with.
   */
  shareData(sharedData: SharedData, screenId) {
    if (!isEqual(this.sharedData?.[screenId], sharedData)) {
      this.sharedData = {
        ...this.sharedData,
        [screenId]: {
          ...sharedData,
          data: cloneDeep(sharedData?.data),
          screenId,
        },
      };
      this.sharedData$.next(this.sharedData);
    }
  }

  /**
   * Updates the shared data for a specific screen.
   * @param data - The data to update.
   * @param screenId - The ID of the screen.
   * @param keyToUpdate - The key to update in the data. Optional.
   */
  updateData(data, screenId, keyToUpdate?) {
    const screenData = this.sharedData[screenId];
    let dataToUpdate = Array.isArray(screenData?.data)
      ? [...screenData?.data]
      : screenData?.data
      ? { ...screenData?.data }
      : undefined;
    if (keyToUpdate) {
      if (Array.isArray(get(dataToUpdate, keyToUpdate))) {
        dataToUpdate[keyToUpdate] = Array.isArray(data) ? data : [data];
      } else {
        set(dataToUpdate, keyToUpdate, data);
      }
    } else if (Array.isArray(dataToUpdate) && !Array.isArray(data)) {
      dataToUpdate.push(data);
    } else {
      dataToUpdate = cloneDeep(data);
    }
    this.sharedData = {
      ...this.sharedData,
      [screenId]: {
        data: dataToUpdate,
        screenId,
      },
    };
    this.sharedData$.next(this.sharedData);
  }

  /**
   * Clears the data associated with the specified screen ID.
   * If the screen ID exists in the shared data, it will be deleted and the updated shared data will be emitted.
   *
   * @param screenId - The ID of the screen for which to clear the data.
   */
  clearData(screenId: string) {
    if (this.sharedData[screenId]) {
      delete this.sharedData[screenId];
      this.sharedData$.next(this.sharedData);
    }
  }
  
  /**
   * Returns an observable that emits the refresh screen data.
   *
   * @returns {Observable<any>} An observable that emits the refresh screen data.
   */
  getScreenIdToRefresh() {
    return this.refreshScreenData$.asObservable();
  }

  /**
   * Triggers an update to refresh the screen data.
   *
   * @param screenData - The data to be used for refreshing the screen.
   */
  setScreenToRefresh(screenId: string) {
    this.refreshScreenData$.next(screenId);
  }
}
