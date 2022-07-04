import { BooleanStringType } from './BooleanStringType'

export interface IStringParser {
  stringToInt: (str: string) => number
  stringToBool: (booleanString: BooleanStringType) => boolean
}
