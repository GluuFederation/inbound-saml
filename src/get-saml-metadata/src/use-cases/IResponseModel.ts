import { RequestId } from '@get-saml-metadata/use-cases/IRequestModel'

export interface IResponseModel<T> {
  requestId: RequestId
  response: T
}
