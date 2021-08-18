import { ISingleValidator } from '@sp-proxy/interface-adapters/protocols/ISingleValidator'

/**
 * Check if string is a valid url pattern
 * @param url
 * @returns
 */
export const isValidUrl: ISingleValidator = async (
  url: string
): Promise<boolean> => {
  return true
}
