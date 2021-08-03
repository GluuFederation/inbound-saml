import { GetExternalDataInteractor } from '../../../use-cases/GetExternalDataInteractor'
import { BaseGetExternalDataInteractor } from '../../../use-cases/IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from '../../../use-cases/IGetExternalDataOutputBoundary'
import { makeFileXmlMetadataLoaderAdapter } from '../../data/factories/makeFileLoaderAdapter'
import { makeExternalDataMapper } from './makeExternalDataMapper'
import { makeMetadataMapper } from './makeMetadataMapper'

export const makeGetExternalDataInteractor = (
  presenter: IGetExternalDataOutputBoundary): BaseGetExternalDataInteractor => {
  return new GetExternalDataInteractor(
    makeFileXmlMetadataLoaderAdapter(), makeMetadataMapper(), makeExternalDataMapper(), presenter
  )
}
