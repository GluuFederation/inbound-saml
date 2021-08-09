import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export interface ICreateRemoteIdpInputBoundary {
  execute: (
    request: IRequestModel<CreateRemoteIdpRequestModel>
  ) => Promise<void>
}
