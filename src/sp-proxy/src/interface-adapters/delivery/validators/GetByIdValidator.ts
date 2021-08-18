import { GetByIdDTO } from '@sp-proxy/interface-adapters/delivery/dtos/GetByIdDTO'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'

/**
 * Validate requests with GetById DTO type
 */
export class GetByIdValidator implements IValidator {
  async isValid(request: IRequest<GetByIdDTO>): Promise<boolean> {
    if (!('id' in request.body)) {
      throw new InvalidRequestError('No id key found in request body')
    } else if (request.body.id === null) {
      throw new InvalidRequestError('Received request with id null')
    } else if (typeof request.body.id !== 'string') {
      throw new InvalidRequestError('Received request id is not a string')
    }
    return true
  }
}
