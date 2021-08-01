import { existsSync } from 'fs'
import { BaseFileValidator } from '../../../use-cases/ports/BaseFileValidator'

/**
 * Check if file exists
 */
export class FileValidatorAdapter extends BaseFileValidator {
  isValid (filepath: string): boolean {
    return existsSync(filepath)
  }
}
