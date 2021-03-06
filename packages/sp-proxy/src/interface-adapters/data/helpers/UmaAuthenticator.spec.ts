// request to a valid endpoint
// receive 401 and ticket #
// create client assertion
// create uma token request
//  retrieve token

import axios, { AxiosResponse } from 'axios'
import crypto from 'crypto'
import fs from 'fs'
import https, { Agent } from 'https'
import { stringify } from 'querystring'
import { UmaHeaderError } from '../errors/UmaHeaderError'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { IOxTrustApiSettings } from '../protocols/IOxTrustApiSettings'
import { ITokenRequestFactory } from '../protocols/ITokenRequestFactory'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { IUmaTokenRequest } from '../protocols/IUmaTokenRequest'
import { IWwwAuthenticate } from '../protocols/IWwwAuthenticate'
import { UmaAuthenticator } from './UmaAuthenticator'
// jest.mock('axios')
jest.mock('crypto')
jest.mock('fs')

const makeOxTrustApiSettings = (): IOxTrustApiSettings => {
  return {
    host: 'valid host',
    completePath: '/complete/api/path/v1',
    clientId: 'valid client id',
    tokenUrl: 'valid token url',
    kid: 'a valid kid',
    pvkPath: 'valid pvk path'
  }
}

const makeJwtSigner = (): IJwtSigner => {
  class JwtSignerStub implements IJwtSigner {
    sign(header: IJwtHeader, payload: IJwtPayload, secret: string): string {
      return 'signed jwt stub'
    }
  }
  return new JwtSignerStub()
}

const makeUmaHeaderParser = (): IUmaHeaderParser => {
  class UmaHeaderParserStub implements IUmaHeaderParser {
    parse(wwwAuthenticateValue: string): IWwwAuthenticate {
      return {
        umaRealm: 'valid parsed uma realm stub',
        hostId: 'valid.parsed.host.id.stub',
        asUri: 'valid parsed asUri stub',
        ticket: 'valid parsed ticket # stub'
      }
    }
  }
  return new UmaHeaderParserStub()
}

const makeTokenRequestFactory = (): ITokenRequestFactory => {
  class TokenRequestFactoryStub implements ITokenRequestFactory {
    make(ticket: string, clientId: string): IUmaTokenRequest {
      const validRequest: IUmaTokenRequest = {
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
        ticket: 'factory stub ticket',
        client_id: 'factory stub id',
        client_assertion_type:
          'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: 'factory stub client assertion',
        scope: 'oxtrust-api-read oxtrust-api-write'
      }
      return validRequest
    }
  }
  return new TokenRequestFactoryStub()
}

interface SutTypes {
  jwtSigner: IJwtSigner
  umaHeaderParser: IUmaHeaderParser
  oxTrustApiSettings: IOxTrustApiSettings
  tokenRequestFactory: ITokenRequestFactory
  sut: IUmaAuthenticator
}

const makeSut = (): SutTypes => {
  const jwtSigner = makeJwtSigner()
  const umaHeaderParser = makeUmaHeaderParser()
  const oxTrustApiSettings = makeOxTrustApiSettings()
  const tokenRequestFactory = makeTokenRequestFactory()
  const sut = new UmaAuthenticator(
    umaHeaderParser,
    jwtSigner,
    oxTrustApiSettings,
    tokenRequestFactory
  )
  return {
    jwtSigner,
    umaHeaderParser,
    oxTrustApiSettings,
    tokenRequestFactory,
    sut
  }
}

const valid401Response: AxiosResponse = {
  data: null,
  status: 401,
  statusText: 'Unauthorized',
  headers: {
    'www-authenticate':
      'UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
  },
  config: undefined as any
}

const validPostResponse: AxiosResponse = {
  data: {
    access_token: 'valid access token stub',
    token_type: 'Bearer',
    pct: 'valid pct stub',
    upgraded: false
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-type': 'application/json'
  },
  config: undefined as any
}

// mock default stub answer for axios.get and post to token endpoint
jest.spyOn(axios, 'request').mockResolvedValue(valid401Response)
jest.spyOn(axios, 'post').mockResolvedValue(validPostResponse)
jest.spyOn(fs, 'readFileSync').mockReturnValue('pvk loaded from file')
describe('UmaAuthenticator', () => {
  it('should request a valid endpoint', async () => {
    const requestSpy = jest
      .spyOn(axios, 'request')
      .mockResolvedValueOnce(valid401Response)
    const { sut } = makeSut()
    await sut.authenticate('valid endpoint', 'GET')
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'valid endpoint' })
    )
  })
  it('should throw if status code is not 401', async () => {
    jest.spyOn(axios, 'request').mockResolvedValueOnce({
      status: 402
    })
    const { sut } = makeSut()
    await expect(sut.authenticate('valid endpoint', 'GET')).rejects.toThrow()
  })
  it('should call umaHeaderParser with wwwwAuthenticate value', async () => {
    const { sut, umaHeaderParser } = makeSut()
    const parserSpy = jest.spyOn(umaHeaderParser, 'parse')
    await sut.authenticate('valid endpoint', 'GET')
    expect(parserSpy).toHaveBeenCalledWith(
      'UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
    )
  })
  it('should throw if parser throws', async () => {
    const { sut, umaHeaderParser } = makeSut()
    jest.spyOn(umaHeaderParser, 'parse').mockImplementationOnce(() => {
      throw new UmaHeaderError('any error')
    })
    await expect(sut.authenticate('valid endpoint', 'GET')).rejects.toThrow()
  })
  it('should call readFileSync with pvkPath', async () => {
    const { sut, oxTrustApiSettings } = makeSut()
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')
    await sut.authenticate('valid endpoint', 'GET')
    expect(readFileSyncSpy).toHaveBeenCalled()
    expect(readFileSyncSpy).toHaveBeenCalledWith(
      oxTrustApiSettings.pvkPath,
      'utf-8'
    )
  })
  it('should call jwtSigner with correct params', async () => {
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
    const expectedSecret = 'pvk loaded from file'

    await sut.authenticate('valid endpoint', 'GET')
    expect(signSpy).toHaveBeenCalledWith(
      expectedHeader,
      expectedPayload,
      expectedSecret
    )
  })
  it('should call TokenRequestFactory with correct params', async () => {
    const { sut, tokenRequestFactory } = makeSut()
    const makeSpy = jest.spyOn(tokenRequestFactory, 'make')
    await sut.authenticate('valid endpoint', 'GET')
    expect(makeSpy).toHaveBeenCalledWith(
      'valid parsed ticket # stub',
      'valid client id',
      'signed jwt stub'
    )
  })
  it('should call axios post once with RPT request', async () => {
    const { sut, tokenRequestFactory, oxTrustApiSettings } = makeSut()
    const requestBodyStub = tokenRequestFactory.make('any', 'any', 'any')
    const expectedUrl = oxTrustApiSettings.tokenUrl
    const expectedBody = stringify(requestBodyStub)
    const postSpy = jest.spyOn(axios, 'post')
    await sut.authenticate('valid endpoint', 'GET')
    expect(postSpy.mock.calls[0][2]).toEqual({
      httpsAgent: expect.any(Agent),
      validateStatus: expect.any(Function)
    })
    expect(postSpy).toHaveBeenCalledWith(
      expectedUrl,
      expectedBody,
      expect.anything() // already checked above
    )
  })
  it('should call https Agent once with correct params', async () => {
    const agentSpy = jest.spyOn(https, 'Agent')
    const { sut } = makeSut()
    await sut.authenticate('valid endpoint', 'GET')
    expect(agentSpy).toHaveBeenCalledWith({ rejectUnauthorized: false })
  })
  it('should return bearer token', async () => {
    const { sut } = makeSut()
    expect(await sut.authenticate('valid endpoint', 'GET')).toEqual(
      validPostResponse.data.access_token
    )
  })
  it('should call request with GET method', async () => {
    const { sut } = makeSut()
    const requestSpy = jest.spyOn(axios, 'request')
    await sut.authenticate('valid endpoint', 'GET')
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'GET' })
    )
  })
  it('should call request with POST method', async () => {
    const { sut } = makeSut()
    const requestSpy = jest.spyOn(axios, 'request')
    await sut.authenticate('valid endpoint', 'POST')
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST' })
    )
  })
  it('should call request with application/json content-type', async () => {
    const { sut } = makeSut()
    const requestSpy = jest.spyOn(axios, 'request')
    await sut.authenticate('valid endpoint', 'POST')
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json'
        }
      })
    )
  })
})
