import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

/**
 * T is the returning object model / interface
 */
export interface IMapper<T> {
  map: (requestModel: IRequestModel<any>) => T
}
