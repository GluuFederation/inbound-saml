import { IRequest } from './IRequest'
import { IResponse } from './IResponse'

export interface IController {
  handle: (request: IRequest) => Promise<IResponse>
}
