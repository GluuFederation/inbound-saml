import { IExternalData } from '../domain/protocols/IExternalData'

export type UrlOrPath = string

export interface GetExternalDataResponseModel {
  externalData: IExternalData
}