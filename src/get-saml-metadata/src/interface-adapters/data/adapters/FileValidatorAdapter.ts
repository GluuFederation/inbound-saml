import { BaseFileValidator } from '@get-saml-metadata/use-cases/ports/BaseFileValidator'
import { existsSync } from 'fs'

/**
 * Check if file exists
 */
export class FileValidatorAdapter extends BaseFileValidator {
  async isValid(filepath: string): Promise<boolean> {
    return existsSync(filepath)
  }
}
