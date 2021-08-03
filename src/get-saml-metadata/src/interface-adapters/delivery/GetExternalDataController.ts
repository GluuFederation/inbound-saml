import { EventEmitter } from 'stream'
import { GetExternalDataInteractor } from '../../use-cases/GetExternalDataInteractor'
import { BaseGetExternalDataInteractor, IGetExternalDataInputBoundary } from '../../use-cases/IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from '../../use-cases/IGetExternalDataOutputBoundary'
import { IValidator } from '../../use-cases/ports/IValidator'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
import { IController } from './protocols/IController'
import { IGetExternalDataRequest } from './protocols/IGetExternalDataRequest'
import { IRequest } from './protocols/IRequest'
import { IGetExternalDataRequestMapper } from './protocols/IRequestMapper'

export class GetExternalDataController implements IController {
  constructor (
    private readonly inputChannel: IGetExternalDataInputBoundary,
    private readonly urlOrPathValidator: IValidator,
    private readonly requestMapper: IGetExternalDataRequestMapper
  ) {}

  async handle (request: IRequest<IGetExternalDataRequest>): Promise<void> {
    if (!this.urlOrPathValidator.isValid(request.request.urlOrPath)) {
      throw new InvalidPathOrUrlError(request.request.urlOrPath)
    }
    const mapped = this.requestMapper.map(request)
    await this.inputChannel.execute(
      mapped
    )
  }
}
