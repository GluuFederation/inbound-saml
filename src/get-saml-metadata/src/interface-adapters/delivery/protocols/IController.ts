import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'

export interface IController {
  handle: (request: IRequest<any>) => Promise<void>
}
