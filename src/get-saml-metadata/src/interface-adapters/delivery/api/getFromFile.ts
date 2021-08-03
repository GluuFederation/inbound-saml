import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'
import { IExternalData } from '../../../entities/IExternalData'
import { GetExternalDataInteractor } from '../../../use-cases/GetExternalDataInteractor'
import { UrlOrPath } from '../../../use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '../../../use-cases/GetExternalDataResponseModel'
import { IResponseModel } from '../../../use-cases/IResponseModel'
import { ExternalDataMapper } from '../../../use-cases/utils/ExternalDataMapper'
import { makeFileXmlMetadataLoaderAdapter } from '../../data/factories/makeFileLoaderAdapter'
import { MetadataMapperAdapter } from '../../utils/MetadataMapperAdapter'
import { makeFileValidatorAdapter } from '../factories/makeFileValidatorAdapter'
import { makeGetExternalDataRequestMapper } from '../factories/makeGetExternalDataRequestMapper'
import { GetExternalDataController } from '../GetExternalDataController'
import { GetExternalDataPresenter } from '../GetExternalDataPresenter'

interface IGetExternalDataResponse {
  requestId: string
  // @todo: create a model only for delivery layer
  response: {
    externalData: IExternalData
  }
}

export const getFromFile = async (path: UrlOrPath): Promise<IGetExternalDataResponse> => {
  const emiter = new EventEmitter()

  const metadataMapper = new MetadataMapperAdapter()
  const externalDataMapper = new ExternalDataMapper()
  const presenter = new GetExternalDataPresenter(
    emiter
  )
  const xmlMetadataLoader = makeFileXmlMetadataLoaderAdapter()

  const interactor = new GetExternalDataInteractor(
    xmlMetadataLoader,
    metadataMapper,
    externalDataMapper,
    presenter
  )

  const validator = makeFileValidatorAdapter()
  const requestMapper = makeGetExternalDataRequestMapper()
  const controller = new GetExternalDataController(
    interactor,
    validator,
    requestMapper
  )

  const requestId = randomUUID()
  const result: Array<IResponseModel<GetExternalDataResponseModel>> = []
  emiter.on(requestId, (response: IResponseModel<GetExternalDataResponseModel>) => {
    result.push(response)
  })
  await controller.handle({
    id: requestId,
    request: {
      source: 'file',
      urlOrPath: path
    }
  })
  return result[1]
}
