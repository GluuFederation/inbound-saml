import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'

export interface IController {
  handle: (request: IRequest<any>) => Promise<void>
}
