import * as jwt from 'jsonwebtoken'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'

export class JwtSigner implements IJwtSigner {
  sign(header: IJwtHeader, payload: IJwtPayload, secret: string): string {
    const options: jwt.SignOptions = {
      algorithm: header.alg,
      keyid: header.kid
    }
    jwt.sign(payload, secret, options)
    return 'any value'
  }
}
