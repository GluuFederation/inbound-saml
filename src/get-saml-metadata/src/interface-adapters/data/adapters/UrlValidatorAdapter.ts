import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { BaseUrlValidator } from '@get-saml-metadata/use-cases/ports/BaseUrlValidator'
import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'
import axios, { AxiosError } from 'axios'
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
    const isValid: boolean[] = []
    axios
      .get(url)
      .then()
      .catch((err: AxiosError) => {
        if (err.request !== null) {
          isValid.push(false)
        }
      })
    return isValid[0]
  }
}
