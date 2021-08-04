import { IRequestModel } from '@get-saml-metadata/use-cases/IRequestModel'

export type UrlOrPath = string

export interface GetExternalDataRequestModel extends IRequestModel {
  urlOrPath: UrlOrPath
}
