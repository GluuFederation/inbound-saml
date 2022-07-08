import { IValidator } from '../protocols/IValidator'

export class NotNullOrUndefinedValidator implements IValidator {
  isValid(value: any | undefined): boolean {
    if (value == null) {
      throw new Error('InvalidData: Value cannot be null or undefined')
    }
    return true
  }
}
