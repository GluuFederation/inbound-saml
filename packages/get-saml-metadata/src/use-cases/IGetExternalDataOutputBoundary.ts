import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'

export interface IGetExternalDataOutputBoundary {
  present: (
    response: IResponseModel<GetExternalDataResponseModel>
  ) => Promise<void>
}
