import { IRequestModel } from './IRequestModel'

export type UrlOrPath = string

export interface GetExternalDataRequestModel extends IRequestModel {
  urlOrPath: UrlOrPath
}
