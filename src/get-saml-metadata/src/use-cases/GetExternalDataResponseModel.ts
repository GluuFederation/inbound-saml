import { IExternalData } from '@get-saml-metadata/entities/IExternalData'

export type UrlOrPath = string

export interface GetExternalDataResponseModel {
  externalData: IExternalData
}
