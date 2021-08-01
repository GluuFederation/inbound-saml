import { GetExternalDataRequestModel } from '../../../use-cases/GetExternalDataRequestModel'
import { IGetExternalDataRequest } from './IGetExternalDataRequest'
import { IRequest } from './IRequest'

export interface IGetExternalDataRequestMapper {
  map: (request: IRequest<IGetExternalDataRequest>) => GetExternalDataRequestModel
}
