export type RequestId = string
export interface IRequestModel<T> {
  requestId: RequestId
  request: T
}
