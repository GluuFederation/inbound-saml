import { RequestId } from '@sp-proxy/use-cases/io-models/IRequestModel'

export interface IResponseModel<T> {
  requestId: RequestId
  response: T
}
