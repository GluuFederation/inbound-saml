import { PersistenceError } from '../errors/PersistenceError'
import { BooleanStringType } from '../protocols/BooleanStringType'
import { IStringParser } from '../protocols/IStringParser'

export class StringParser implements IStringParser {
  stringToInt(str: string): number {
    const parsed = parseInt(str, 10)
    return parsed
  }

  /**
   * Convert boolean as String to boolean
   * @param booleanString Accepts 'TRUE', 'true', 'True', 'FALSE', 'false', 'False'
   * @returns true or false
   * @throw { PersistenceError }
   */
  stringToBool(booleanAsString: BooleanStringType): boolean {
    throw new PersistenceError(
      `Error parsing string ${booleanAsString} to boolean`
    )
    // return true
  }
}
