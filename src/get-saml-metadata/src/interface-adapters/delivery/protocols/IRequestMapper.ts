import { IRequestModel } from '../../../use-cases/IRequestModel'
import { IRequest } from './IRequest'

export interface IRequestMapper {
  map: (request: IRequest<any>) => IRequestModel
}
