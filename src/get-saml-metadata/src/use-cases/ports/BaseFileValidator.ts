import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'

export abstract class BaseFileValidator implements IValidator {
  abstract isValid (filepath: string): boolean
}
