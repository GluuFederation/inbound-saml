import * as jwt from 'jsonwebtoken'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'

export class JwtSigner implements IJwtSigner {
  sign(header: IJwtHeader, payload: IJwtPayload, keyOrSecret: string): string {
    const options: jwt.SignOptions = {
      algorithm: header.alg,
      keyid: header.kid
    }
    const signedJwt = jwt.sign(payload, keyOrSecret, options)
    return signedJwt
  }
}
