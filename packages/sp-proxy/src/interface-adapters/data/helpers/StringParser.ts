import { IStringParser } from '../protocols/IStringParser'

export class StringParser implements IStringParser {
  stringToInt(str: string): number {
    const parsed = parseInt(str, 10)
    return parsed
  }

  stringToBool(str: string): boolean {
    return true
  }
}
