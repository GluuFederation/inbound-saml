import axios from 'axios'
import { randomUUID } from 'crypto'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { IOxTrustApiSettings } from '../protocols/IOxTrustApiSettings'
import { ITokenRequestFactory } from '../protocols/ITokenRequestFactory'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'

export class UmaAuthenticator implements IUmaAuthenticator {
  constructor(
    private readonly umaHeaderParser: IUmaHeaderParser,
    private readonly jwtSigner: IJwtSigner,
    private readonly oxTrustSettings: IOxTrustApiSettings,
    private readonly requestFactory: ITokenRequestFactory
  ) {}

  async authenticate(endpoint: string): Promise<string> {
    const response = await axios.get(endpoint)
    if (response.status !== 401) {
      throw new Error()
    } else {
      const wwwAuthenticate = this.umaHeaderParser.parse(
        response.headers['WWW-Authenticate']
      )
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
      const pvkOrSecret = this.oxTrustSettings.pvkOrSecret
      const clientAssertion = this.jwtSigner.sign(header, payload, pvkOrSecret)
      this.requestFactory.make(
        wwwAuthenticate.ticket,
        this.oxTrustSettings.clientId,
        clientAssertion
      )

      return ''
    }
  }
}
