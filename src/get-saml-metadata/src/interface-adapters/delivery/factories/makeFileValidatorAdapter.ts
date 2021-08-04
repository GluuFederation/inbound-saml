import { FileValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/FileValidatorAdapter'
import { BaseFileValidator } from '@get-saml-metadata/use-cases/ports/BaseFileValidator'

export const makeFileValidatorAdapter = (): BaseFileValidator => {
  return new FileValidatorAdapter()
}
