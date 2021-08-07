import { InvalidPathOrUrlError } from '@get-saml-metadata/interface-adapters/delivery/errors/InvalidPathOrUrlError'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { IGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequestMapper'
import { IGetExternalDataInputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'
import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'

export class GetExternalDataController implements IController {
  constructor(
    private readonly inputChannel: IGetExternalDataInputBoundary,
    private readonly urlOrPathValidator: IValidator,
    private readonly requestMapper: IGetExternalDataRequestMapper
  ) {}

  async handle(request: IRequest<IGetExternalDataRequest>): Promise<void> {
    if (!this.urlOrPathValidator.isValid(request.request.urlOrPath)) {
      throw new InvalidPathOrUrlError(request.request.urlOrPath)
    }
    const mapped = this.requestMapper.map(request)
    await this.inputChannel.execute(mapped)
  }
}
