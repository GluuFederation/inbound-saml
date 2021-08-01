import { IGetExternalDataInputBoundary } from '../../use-cases/IGetExternalDataInputBoundary'
import { IValidator } from '../../use-cases/ports/IValidator'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
import { IController } from './protocols/IController'
import { IGetExternalDataRequest } from './protocols/IGetExternalDataRequest'
import { IRequest } from './protocols/IRequest'

export class GetExternalDataController implements IController {
  constructor (
    private readonly inputChannel: IGetExternalDataInputBoundary,
    private readonly urlOrPathValidator: IValidator
  ) {}

  async handle (request: IRequest<IGetExternalDataRequest>): Promise<void> {
    if (!this.urlOrPathValidator.isValid(request.request.urlOrPath)) {
      throw new InvalidPathOrUrlError(request.request.urlOrPath)
    }
  }
}
