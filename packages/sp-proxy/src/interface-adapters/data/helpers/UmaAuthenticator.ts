import axios from 'axios'
import { randomUUID } from 'crypto'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { IOxTrustApiSettings } from '../protocols/IOxTrustApiSettings'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'

export class UmaAuthenticator implements IUmaAuthenticator {
  constructor(
    private readonly umaHeaderParser: IUmaHeaderParser,
    private readonly jwtSigner: IJwtSigner,
    private readonly oxTrustSettings: IOxTrustApiSettings
  ) {}

  async authenticate(endpoint: string): Promise<string> {
    const response = await axios.get(endpoint)
    if (response.status !== 401) {
      throw new Error()
    } else {
      this.umaHeaderParser.parse(response.headers['WWW-Authenticate'])
      const header: IJwtHeader = {
        TYP: 'JWT',
        alg: 'RS256',
        kid: this.oxTrustSettings.kid
      }
      const payload: IJwtPayload = {
        iss: this.oxTrustSettings.clientId,
        sub: this.oxTrustSettings.clientId,
        iat: Date.now(),
        exp: Math.floor(Date.now() / 1000 + 30),
        jti: randomUUID(),
        aud: this.oxTrustSettings.tokenUrl
      }
      const secret = this.oxTrustSettings.pvkOrSecret
      this.jwtSigner.sign(header, payload, secret)
      return ''
    }
  }
}
