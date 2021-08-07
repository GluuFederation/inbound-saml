import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'

export abstract class BaseUrlValidator implements IValidator {
  abstract isValid(filepath: string): Promise<boolean>
}
