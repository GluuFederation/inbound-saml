import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { BaseUrlValidator } from '@get-saml-metadata/use-cases/ports/BaseUrlValidator'
import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'
import axios from 'axios'
export class UrlValidatorAdapter
  extends BaseUrlValidator
  implements IValidator
{
  /**
   * Check if url is valid
   * - if it's accessible and returns
   * @param url
   * @returns true if url returns, false if axios throws
   */
  async isValid(url: UrlOrPath): Promise<boolean> {
    try {
      await axios.get(url)
      return true
    } catch (err) {
      return false
    }
  }
}
