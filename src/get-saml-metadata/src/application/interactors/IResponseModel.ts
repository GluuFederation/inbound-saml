import { RequestId } from './IRequestModel'

export type ResponseId = string
export interface IResponseModel<T> {
  requestId: RequestId
  response: T
}
