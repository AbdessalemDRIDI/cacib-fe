import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LegalInformation } from './legal-information.model';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class LegalInformationService {
  private legalInformation: LegalInformation;

  constructor(private httpClient: HttpClient) {
    if (this.legalInformation === undefined) {
      this.loadLegalInformation();
    }
  }

  /**
   * Get legal information of the application
   */
  loadLegalInformation() {
    this.httpClient.get<LegalInformation>(`${BASE_PATH}/legalInformation`).subscribe((result) => {
      this.legalInformation = result;
    });
  }

  /**
   * @returns { LegalInformation }
   */
  getLegalInformation() {
    return this.legalInformation;
  }

  /**
   * This method returns the application's name
   * @returns { string }
   */
  getApplicationName() {
    return this.legalInformation?.applicationName;
  }

  /**
   * This method returns the application's version
   * @returns { string }
   */
  getVersion() {
    return this.legalInformation?.version;
  }

  /**
   * This method returns the application's welcome message
   * @returns { string }
   */
  getWelcomeMessage() {
    return this.legalInformation?.welcomeMessage;
  }

  /**
   * This method returns the application's copyright message
   * @returns { string }
   */
  getCopyrightMessage() {
    return this.legalInformation?.copyrightMessage;
  }
}
