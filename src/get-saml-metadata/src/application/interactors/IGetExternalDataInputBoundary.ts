import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'

export interface IGetExternalDataInputBoundary{
  execute: (request: GetExternalDataRequestModel) => Promise<void>
}
