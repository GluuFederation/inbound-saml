import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

/**
 * Input boundary where T is the RequestModel interface
 */
export interface InputBoundary<T> {
  execute: (request: IRequestModel<T>) => Promise<void>
}
