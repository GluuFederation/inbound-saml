import { BooleanStringType } from '../protocols/BooleanStringType'
import { IStringParser } from '../protocols/IStringParser'

export class StringParser implements IStringParser {
  stringToInt(str: string): number {
    const parsed = parseInt(str, 10)
    if (Number.isNaN(parsed)) {
      throw new Error(`Error parsing string ${str} to integer`)
    }
    return parsed
  }

  /**
   * Convert boolean as String to boolean
   * @param booleanString Accepts 'TRUE', 'true', 'True', 'FALSE', 'false', 'False'
   * @returns true or false
   * @throw { PersistenceError }
   */
  stringToBool(booleanAsString: BooleanStringType): boolean {
    const validParams: BooleanStringType[] = [
      'TRUE',
      'true',
      'True',
      'FALSE',
      'false',
      'False'
    ]
    if (!validParams.includes(booleanAsString)) {
      throw new Error(`Error parsing string ${booleanAsString} to boolean`)
    }

    if (['FALSE', 'false', 'False'].includes(booleanAsString)) {
      return false
    } else {
      return true
    }
  }
}
