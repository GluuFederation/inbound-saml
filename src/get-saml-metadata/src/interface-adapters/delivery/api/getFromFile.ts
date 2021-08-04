
import { makeGetExternalDataController } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataController'
import { makeGetExternalDataInteractor } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataInteractor'
import { makeGetExternalDataPresenter } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataPresenter'
import { IGetExternalDataResponse } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataResponse'
import { IGetter } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetter'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

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
