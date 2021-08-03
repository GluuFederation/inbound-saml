import { EventEmitter } from 'node:stream'
import { GetExternalDataResponseModel } from '../../use-cases/GetExternalDataResponseModel'
import { IGetExternalDataOutputBoundary } from '../../use-cases/IGetExternalDataOutputBoundary'
import { IResponseModel } from '../../use-cases/IResponseModel'

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
