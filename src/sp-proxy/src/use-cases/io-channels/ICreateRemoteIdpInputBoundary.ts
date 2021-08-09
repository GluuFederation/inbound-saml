import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'

export interface ICreateRemoteIdpInputBoundary {
  execute: (request: CreateRemoteIdpRequestModel) => Promise<void>
}
