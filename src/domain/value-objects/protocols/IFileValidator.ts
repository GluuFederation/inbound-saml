import { IValidator } from '../../protocols/IValidator'

export abstract class IFileValidator implements IValidator {
  abstract isValid (filepath: string): boolean
}
