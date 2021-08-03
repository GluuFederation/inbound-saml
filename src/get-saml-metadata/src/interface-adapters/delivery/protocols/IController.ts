import { IRequest } from './IRequest'

export interface IController {
  handle: (request: IRequest<any>, callback: any) => Promise<void>
}
