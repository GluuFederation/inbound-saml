import { existsSync } from 'fs'
import { BaseFileValidator } from '../../domain/protocols/BaseFileValidator'

export class FileValidatorAdapter extends BaseFileValidator {
  isValid (filepath: string): boolean {
    return existsSync(filepath)
  }
}
