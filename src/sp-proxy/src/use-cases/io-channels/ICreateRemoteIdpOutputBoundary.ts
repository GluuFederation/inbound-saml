import { CreateRemoteIdpResponseModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpResponseModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

export interface ICreateRemoteIdpOutputBoundary {
  present: (
    response: IResponseModel<CreateRemoteIdpResponseModel>
  ) => Promise<void>
}
