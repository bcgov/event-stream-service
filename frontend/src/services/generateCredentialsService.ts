import { appAxios } from './interceptors';
import type { GeneratedCredentials } from '@/types';

export default class GenerateCredentialsService {
  private static _instance: GenerateCredentialsService;

  /**
   * @constructor
   */
  constructor() {
    if (!GenerateCredentialsService._instance) {
      GenerateCredentialsService._instance = this;
    }

    return GenerateCredentialsService._instance;
  }

  public async generateCredentials(): Promise<GeneratedCredentials | null> {
    return new Promise<GeneratedCredentials | null>((resolve, reject) => {
      appAxios()
        .get('generateCredentials')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(new Error(`Error generating credentials: ${err}`));
        });
    });
  }
}
