import { IJwtHeader } from './IJwtHeader'
import { IJwtPayload } from './IJwtPayload'

export interface IJwtSigner {
  sign: (header: IJwtHeader, payload: IJwtPayload, secret: string) => string
}
