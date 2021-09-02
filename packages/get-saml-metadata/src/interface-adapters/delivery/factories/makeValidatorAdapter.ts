import { FileValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/FileValidatorAdapter'
import { UrlValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/UrlValidatorAdapter'
import { SourceType } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { BaseFileValidator } from '@get-saml-metadata/use-cases/ports/BaseFileValidator'

export const makeValidatorAdapter = (source: SourceType): BaseFileValidator => {
  switch (source) {
    case 'file': {
      return new FileValidatorAdapter()
    }
    case 'url': {
      return new UrlValidatorAdapter()
    }
  }
}
