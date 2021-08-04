import { makeFileValidatorAdapter } from '@get-saml-metadata/interface-adapters/delivery/factories/makeFileValidatorAdapter'
import { makeGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataRequestMapper'
import { GetExternalDataController } from '@get-saml-metadata/interface-adapters/delivery/GetExternalDataController'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IGetExternalDataInputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'

export const makeGetExternalDataController = (
  interactor: IGetExternalDataInputBoundary): IController => {
  return new GetExternalDataController(
    interactor,
    makeFileValidatorAdapter(),
    makeGetExternalDataRequestMapper()
  )
}
