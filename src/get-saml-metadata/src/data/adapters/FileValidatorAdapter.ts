import { existsSync } from 'fs'
import { BaseFileValidator } from '../../use-cases/ports/BaseFileValidator'

export class FileValidatorAdapter extends BaseFileValidator {
  isValid (filepath: string): boolean {
    return existsSync(filepath)
  }
}
