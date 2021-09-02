import { isValidUrl } from '@sp-proxy/interface-adapters/delivery/validators/singles/isValidUrl'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataRequest'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'

// for now validates only if URL string is valid
export class AddTrFromMetadataValidator implements IValidator {
  async isValid(
    request: IRequest<IAddTrFromMetadataRequest>
  ): Promise<boolean> {
    await isValidUrl(request.body.url)
    return true
  }
}
