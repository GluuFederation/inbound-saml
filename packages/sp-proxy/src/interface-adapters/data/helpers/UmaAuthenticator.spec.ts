// request to a valid endpoint
// receive 401 and ticket #
// create client assertion
// use ticket to retrieve token

import axios, { AxiosResponse } from 'axios'
import crypto from 'crypto'
import { UmaHeaderError } from '../errors/UmaHeaderError'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { IOxTrustApiSettings } from '../protocols/IOxTrustApiSettings'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { IWwwAuthenticate } from '../protocols/IWwwAuthenticate'
import { UmaAuthenticator } from './UmaAuthenticator'
jest.mock('axios')
jest.mock('crypto')

const makeOxTrustApiSettings = (): IOxTrustApiSettings => {
  return {
    clientId: 'valid client id',
    tokenUrl: 'valid token url',
    kid: 'a valid kid',
    pvkOrSecret: 'valid secret'
  }
}

const makeJwtSigner = (): IJwtSigner => {
  class JwtSignerStub implements IJwtSigner {
    sign(header: IJwtHeader, payload: IJwtPayload, secret: string): string {
      return 'signed jwt'
    }
  }
  return new JwtSignerStub()
}

const makeUmaHeaderParser = (): IUmaHeaderParser => {
  class UmaHeaderParserStub implements IUmaHeaderParser {
    parse(wwwAuthenticateValue: string): IWwwAuthenticate {
      return {
        umaRealm: 'valid uma realm stub',
        hostId: 'valid.host.id.stub',
        asUri: 'valid asUri stub',
        ticket: 'valid ticket # stub'
      }
    }
  }
  return new UmaHeaderParserStub()
}

interface SutTypes {
  jwtSigner: IJwtSigner
  umaHeaderParser: IUmaHeaderParser
  oxTrustApiSettings: IOxTrustApiSettings
  sut: IUmaAuthenticator
}

const makeSut = (): SutTypes => {
  const jwtSigner = makeJwtSigner()
  const umaHeaderParser = makeUmaHeaderParser()
  const oxTrustApiSettings = makeOxTrustApiSettings()
  const sut = new UmaAuthenticator(
    umaHeaderParser,
    jwtSigner,
    oxTrustApiSettings
  )
  return {
    jwtSigner,
    umaHeaderParser,
    oxTrustApiSettings,
    sut
  }
}

const validResponse: AxiosResponse = {
  data: null,
  status: 401,
  statusText: 'Unauthorized',
  headers: {
    'WWW-Authenticate':
      'UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
  },
  config: undefined as any
}

describe('UmaAuthenticator', () => {
  it('should request a valid endpoint', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(validResponse)
    const { sut } = makeSut()
    await sut.authenticate('valid endpoint')
    expect(getSpy).toHaveBeenCalledWith('valid endpoint')
  })
  it('should throw if status code is not 401', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 402
    })
    const { sut } = makeSut()
    await expect(sut.authenticate('valid endpoint')).rejects.toThrow()
  })
  it('should call umaHeaderParser with wwwwAuthenticate value', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(validResponse)
    const { sut, umaHeaderParser } = makeSut()
    const parserSpy = jest.spyOn(umaHeaderParser, 'parse')
    await sut.authenticate('valid endpoint')
    expect(parserSpy).toHaveBeenCalledWith(
      'UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
    )
  })
  it('should throw if parser throws', async () => {
    const { sut, umaHeaderParser } = makeSut()
    jest.spyOn(umaHeaderParser, 'parse').mockImplementationOnce(() => {
      throw new UmaHeaderError('any error')
    })
    await expect(sut.authenticate('valid endpoint')).rejects.toThrow()
  })
  it('should call jwtSigner with correct params', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(validResponse)
    const { sut, jwtSigner, oxTrustApiSettings } = makeSut()
    const signSpy = jest.spyOn(jwtSigner, 'sign')
    const expectedHeader: IJwtHeader = {
      TYP: 'JWT',
      alg: 'RS256',
      kid: oxTrustApiSettings.kid
    }

    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid UUID')
    const expectedPayload: IJwtPayload = {
      iss: oxTrustApiSettings.clientId,
      sub: oxTrustApiSettings.clientId,
      iat: Date.now(),
      exp: Math.floor(Date.now() / 1000 + 30),
      jti: 'valid UUID',
      aud: oxTrustApiSettings.tokenUrl
    }
    const expectedSecret = oxTrustApiSettings.pvkOrSecret

    await sut.authenticate('valid endpoint')
    expect(signSpy).toHaveBeenCalledWith(
      expectedHeader,
      expectedPayload,
      expectedSecret
    )
  })
})
