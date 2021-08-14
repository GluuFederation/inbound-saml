import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

/**
 * T is the specific response model
 */
export interface OutputBoundary<T> {
  present: (response: IResponseModel<T>) => Promise<void>
}
