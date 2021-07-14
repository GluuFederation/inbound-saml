import { existsSync } from 'fs'
import { BaseFileValidator } from '../protocols/BaseFileValidator'

export class FileValidatorAdapter extends BaseFileValidator {
  isValid (filepath: string): boolean {
    return existsSync(filepath)
  }
}
