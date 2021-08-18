import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { ISingleValidator } from '@sp-proxy/interface-adapters/protocols/ISingleValidator'

/**
 * Check if string is a valid url pattern
 * @param url
 * @returns
 */
export const isValidUrl: ISingleValidator = async (
  url: string
): Promise<boolean> => {
  try {
    // eslint-disable-next-line no-new
    new URL(url)
    return true
  } catch (err) {
    throw new InvalidRequestError(`Invalid url: ${url}`)
  }
}
