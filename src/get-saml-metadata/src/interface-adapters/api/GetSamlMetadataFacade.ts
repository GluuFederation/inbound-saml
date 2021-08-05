import { IFetchedData } from '@get-saml-metadata/interface-adapters/api/protocols/IFetchedData'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IGetter } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetter'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class GetSamlMetadataFacade implements IGetter {
  constructor (
    private readonly eventBus: EventEmitter,
    private readonly getExternalDataController: IController
  ) {}

  async getFromFile (path: UrlOrPath): Promise<IFetchedData> {
    const requestId = randomUUID()
    const result: Array<IResponseModel<GetExternalDataResponseModel>> = []
    this.eventBus.once(requestId, (response: IResponseModel<GetExternalDataResponseModel>) => {
      result.push(response)
    })
    const request: IRequest<IGetExternalDataRequest> = {
      id: requestId,
      request: {
        source: 'file',
        urlOrPath: path
      }
    }
    await this.getExternalDataController.handle(request)
    return {
      idpSigningCert: result[0].response.externalData.idpSigningCert,
      singleSignOnServices: result[0].response.externalData.singleSignOnServices
    }
  }
}
