import { IRequest } from './IRequest'

export interface IController {
  handle: (request: IRequest<any>) => Promise<void>
}
