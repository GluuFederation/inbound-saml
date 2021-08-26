import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { isValidUrl } from '@sp-proxy/interface-adapters/delivery/validators/singles/isValidUrl'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'

export class GetTrByHostValidator implements IValidator {
  async isValid(requestDto: IRequest<IGetTrByHostRequest>): Promise<boolean> {
    try {
      await isValidUrl(`https://${requestDto.body.host}`)
      return true
    } catch (err) {
      throw new PersistenceError((err as Error).message)
    }
  }
}
