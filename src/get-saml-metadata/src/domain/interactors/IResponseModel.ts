import { RequestId } from './IRequestModel'

export interface IResponseModel<T> {
  requestId: RequestId
  response: T
}
