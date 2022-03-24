import axios, { AxiosRequestConfig } from 'axios'
import { randomUUID } from 'crypto'
import { readFileSync } from 'fs'
import { Agent } from 'https'
import { stringify } from 'querystring'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { IOxTrustApiSettings } from '../protocols/IOxTrustApiSettings'
import { ITokenRequestFactory } from '../protocols/ITokenRequestFactory'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'

export class UmaAuthenticator implements IUmaAuthenticator {
  private readonly AXIOS_CONFIG: AxiosRequestConfig = {
    httpsAgent: new Agent({
      rejectUnauthorized: false
    }),
    validateStatus: (status: number): boolean => {
      return status <= 401 // if >401, throws
    }
  }

  constructor(
    private readonly umaHeaderParser: IUmaHeaderParser,
    private readonly jwtSigner: IJwtSigner,
    private readonly oxTrustSettings: IOxTrustApiSettings,
    private readonly requestFactory: ITokenRequestFactory
  ) {}

  async authenticate(endpoint: string): Promise<string> {
    // const endpointResponse = await axios.get(endpoint, this.AXIOS_CONFIG)
    const endpointResponse = await axios.request({
      url: endpoint,
      ...this.AXIOS_CONFIG,
      method: 'GET'
    })
    if (endpointResponse.status !== 401) {
      throw new Error()
    } else {
      const wwwAuthenticate = this.umaHeaderParser.parse(
        endpointResponse.headers['www-authenticate']
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
      const pvkOrSecret = readFileSync(this.oxTrustSettings.pvkPath, 'utf-8')
      const clientAssertion = this.jwtSigner.sign(header, payload, pvkOrSecret)
      const umaTokenRequestBody = this.requestFactory.make(
        wwwAuthenticate.ticket,
        this.oxTrustSettings.clientId,
        clientAssertion
      )

      const tokenResponse = await axios.post(
        this.oxTrustSettings.tokenUrl,
        stringify(umaTokenRequestBody),
        this.AXIOS_CONFIG
      )
      return tokenResponse.data.access_token
    }
  }
}
