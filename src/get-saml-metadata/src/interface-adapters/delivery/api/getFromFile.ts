import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'
import { UrlOrPath } from '../../../use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '../../../use-cases/GetExternalDataResponseModel'
import { IResponseModel } from '../../../use-cases/IResponseModel'
import { makeGetExternalDataController } from '../factories/makeGetExternalDataController'
import { makeGetExternalDataInteractor } from '../factories/makeGetExternalDataInteractor'
import { makeGetExternalDataPresenter } from '../factories/makeGetExternalDataPresenter'
import { IGetExternalDataResponse } from '../protocols/IGetExternalDataResponse'
import { IGetter } from '../protocols/IGetter'

export class Getter implements IGetter {
  emiter = new EventEmitter()
  presenter = makeGetExternalDataPresenter(this.emiter)
  interactor = makeGetExternalDataInteractor(this.presenter)
  controller = makeGetExternalDataController(this.interactor)
  result: Array<IResponseModel<GetExternalDataResponseModel>> = []

  getFromFile = async (path: UrlOrPath): Promise<IGetExternalDataResponse> => {
    const requestId = randomUUID()
    const result: Array<IResponseModel<GetExternalDataResponseModel>> = []
    this.emiter.once(requestId, (response: IResponseModel<GetExternalDataResponseModel>) => {
      result.push(response)
    })
    await this.controller.handle({
      id: requestId,
      request: {
        source: 'file',
        urlOrPath: path
      }
    })
    return result[0]
  }
}
