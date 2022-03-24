import { IHttpMethod } from './IHttpMethod'

export interface IUmaAuthenticator {
  authenticate: (endpoint: string, method: IHttpMethod) => Promise<string>
}
