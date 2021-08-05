import { GetExternalDataPresenter } from '@get-saml-metadata/interface-adapters/delivery/GetExternalDataPresenter'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { EventEmitter } from 'stream'

export const makeGetExternalDataPresenter = (
  emiter: EventEmitter): IGetExternalDataOutputBoundary => {
  return new GetExternalDataPresenter(emiter)
}
