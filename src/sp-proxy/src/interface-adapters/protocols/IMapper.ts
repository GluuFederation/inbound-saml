import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

/**
 * IMapper for the DELIVERY LAYER
 * Maps from IRequest to IRequestModel
 */
export interface IMapper<T, Z> {
  map: (request: IRequest<T>) => IRequestModel<Z>
}
