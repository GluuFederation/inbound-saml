import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'
import { IExternalData } from '../../../entities/IExternalData'
import { UrlOrPath } from '../../../use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '../../../use-cases/GetExternalDataResponseModel'
import { IResponseModel } from '../../../use-cases/IResponseModel'
import { makeGetExternalDataController } from '../factories/makeGetExternalDataController'
import { makeGetExternalDataInteractor } from '../factories/makeGetExternalDataInteractor'
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
  const presenter = new GetExternalDataPresenter(
    emiter
  )
  const interactor = makeGetExternalDataInteractor(presenter)

  const controller = makeGetExternalDataController(interactor)

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
