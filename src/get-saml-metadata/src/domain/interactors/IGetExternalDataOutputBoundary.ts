import { GetExternalDataResponseModel } from './GetExternalDataResponseModel'
import { IResponseModel } from './IResponseModel'

export interface IGetExternalDataOutputBoundary {
  present: (response: IResponseModel<GetExternalDataResponseModel>) => void
}
