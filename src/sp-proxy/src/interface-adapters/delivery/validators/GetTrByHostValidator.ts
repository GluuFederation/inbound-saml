import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { isValidUrl } from '@sp-proxy/interface-adapters/delivery/validators/singles/isValidUrl'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'

export class GetTrByHostValidator implements IValidator {
  async isValid(requestDto: IRequest<IGetTrByHostRequest>): Promise<boolean> {
    // TODO: create host validator
    // using dummy https prefix for now, so isValidUrl attend
    await isValidUrl(`https://${requestDto.body.host}`)
    return true
  }
}
