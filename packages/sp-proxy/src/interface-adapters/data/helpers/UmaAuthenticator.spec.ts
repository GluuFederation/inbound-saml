// request to a valid endpoint
// receive 401 and ticket #
// create client assertion
// use ticket to retrieve token

import axios from 'axios'
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

describe('UmaAuthenticator', () => {
  it('should request a valid endpoint', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 401
    })
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
})
