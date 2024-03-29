import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'

/**
 * Formats Keys and Certificates strings
 * Abstract class to be implemented by "UseCaseFormatters"
 * that may need this feature
 * @export
 * @abstract
 * @class BaseKeyCertFormatter
 * @implements {IKeyCertFormatter}
 */
export abstract class BaseKeyCertFormatter implements IKeyCertFormatter {
  /**
   * Format key or cert to string without cert header/footer
   * and without spaces / new line chars
   *
   * @param {string} keyOrCert
   * @return {*}  {Promise<string>}
   * @memberof BaseKeyCertFormatter
   */
  async format(keyOrCert: string): Promise<string> {
    return keyOrCert
  }
}
