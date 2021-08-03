import { EventEmitter } from 'stream'
import { IGetExternalDataOutputBoundary } from '../../../use-cases/IGetExternalDataOutputBoundary'
import { GetExternalDataPresenter } from '../GetExternalDataPresenter'

export const makeGetExternalDataPresenter = (
  emiter: EventEmitter): IGetExternalDataOutputBoundary => {
  return new GetExternalDataPresenter(emiter)
}
