import { IValidator } from './IValidator'

export abstract class BaseFileValidator implements IValidator {
  abstract isValid (filepath: string): boolean
}
