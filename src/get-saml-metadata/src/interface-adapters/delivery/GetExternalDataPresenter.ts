import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { EventEmitter } from 'stream'

export class GetExternalDataPresenter implements IGetExternalDataOutputBoundary {
  /**
   * @param emiter emiter containing request event listener
   */
  constructor (
    private readonly emiter: EventEmitter
  ) { }

  present (response: IResponseModel<GetExternalDataResponseModel>): void {
    this.emiter.emit(response.requestId, response)
  }
}
