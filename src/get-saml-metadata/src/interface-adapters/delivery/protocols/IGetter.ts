import { UrlOrPath } from '../../../use-cases/GetExternalDataRequestModel'
import { IGetExternalDataResponse } from './IGetExternalDataResponse'

export interface IGetter {
  getFromFile: (path: UrlOrPath) => Promise<IGetExternalDataResponse>
}
