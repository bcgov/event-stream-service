import { appAxios } from './interceptors';

export default {
  /**
   * @function helloWorld
   * Returns the secured view page header
   * @returns {Promise} An axios response
   */
  generateCredentials() {
    return appAxios().get('generateCredentials');
  }
};
