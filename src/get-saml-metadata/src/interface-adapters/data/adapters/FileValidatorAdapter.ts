import { BaseFileValidator } from '@get-saml-metadata/use-cases/ports/BaseFileValidator'
import { existsSync } from 'fs'

/**
 * Check if file exists
 */
export class FileValidatorAdapter extends BaseFileValidator {
  isValid(filepath: string): boolean {
    return existsSync(filepath)
  }
}
