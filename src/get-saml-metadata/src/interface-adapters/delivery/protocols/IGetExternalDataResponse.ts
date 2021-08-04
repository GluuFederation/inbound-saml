import { IExternalData } from '../../../entities/IExternalData'

export interface IGetExternalDataResponse {
  requestId: string
  // @todo: create a model only for delivery layer
  response: {
    externalData: IExternalData
  }
}
