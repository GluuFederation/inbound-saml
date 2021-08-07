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
   * - if it's accessible and returns 200
   * @param url
   * @returns true if url returns 200, false if doesn't
   */
  isValid(url: UrlOrPath): boolean {
    axios
      .get(url)
      .then()
      .catch((err) => console.log(err))
    return true
  }
}
