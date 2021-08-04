import { IFetchedData } from '@get-saml-metadata/interface-adapters/api/protocols/IFetchedData'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IGetter } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetter'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class GetSamlMetadtaFacade implements IGetter {
  constructor (
    private readonly eventEmitter: EventEmitter,
    private readonly getExternalDataController: IController
  ) {}

  async getFromFile (path: UrlOrPath): Promise<IFetchedData> {
    const requestId = randomUUID()
    this.eventEmitter.once(requestId, () => {})
    return {
      idpSigningCert: ['', ''],
      singleSignOnServices: [
        {
          location: '',
          binding: ''
        }
      ]
    }
  }
}
