import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

/**
 * IMapper for DELIVERY layer
 * Maps from IRequest to IRequestModel
 */
export interface IDeliveryMapper<T, Z> {
  map: (request: IRequest<T>) => IRequestModel<Z>
}
