// request to a valid endpoint
// receive 401 and ticket #
// create client assertion
// use ticket to retrieve token

import axios, { AxiosResponse } from 'axios'
import { UmaHeaderError } from '../errors/UmaHeaderError'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { JwtSigner } from './JwtSigner'
import { UmaAuthenticator } from './UmaAuthenticator'
import { UmaHeaderParser } from './UmaHeaderParser'
jest.mock('axios')

const makeJwtSigner = (): IJwtSigner => {
  return new JwtSigner()
}

const makeUmaHeaderParser = (): IUmaHeaderParser => {
  return new UmaHeaderParser()
}

interface SutTypes {
  jwtSigner: IJwtSigner
  umaHeaderParser: IUmaHeaderParser
  sut: IUmaAuthenticator
}

const makeSut = (): SutTypes => {
  const jwtSigner = makeJwtSigner()
  const umaHeaderParser = makeUmaHeaderParser()
  const sut = new UmaAuthenticator(umaHeaderParser, jwtSigner)
  return {
    jwtSigner,
    umaHeaderParser,
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
})
