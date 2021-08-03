import { IGetExternalDataInputBoundary } from '../../../use-cases/IGetExternalDataInputBoundary'
import { GetExternalDataController } from '../GetExternalDataController'
import { IController } from '../protocols/IController'
import { makeFileValidatorAdapter } from './makeFileValidatorAdapter'
import { makeGetExternalDataRequestMapper } from './makeGetExternalDataRequestMapper'

export const makeGetExternalDataController = (
  interactor: IGetExternalDataInputBoundary): IController => {
  return new GetExternalDataController(
    interactor,
    makeFileValidatorAdapter(),
    makeGetExternalDataRequestMapper()
  )
}
