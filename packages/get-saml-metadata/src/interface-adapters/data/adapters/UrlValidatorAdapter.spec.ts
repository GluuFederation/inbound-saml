import { UrlValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/UrlValidatorAdapter'
import axios from 'axios'
const fakeUrl = 'valid url'

const makeSut = (): UrlValidatorAdapter => {
  return new UrlValidatorAdapter()
}
describe('UrlValidatorAdapter', () => {
  it('should call axios get once w/ correct url', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce('')
    const sut = makeSut()
    await sut.isValid(fakeUrl)
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(fakeUrl)
  })
  it('should throw if no response', async () => {
    const noResponseUrl = 'no response url'
    const axiosError = {
      request: 'unreachable'
    }
    jest.spyOn(axios, 'get').mockRejectedValueOnce({ axiosError })
    const sut = makeSut()
    await expect(sut.isValid(noResponseUrl)).rejects.toThrow()
  })
  it('should throw if axios error.response', async () => {
    const errorResponseUrl = 'error response url'
    const axiosError = {
      response: 'valid error'
    }
    jest.spyOn(axios, 'get').mockRejectedValueOnce({ axiosError })
    const sut = makeSut()
    await expect(sut.isValid(errorResponseUrl)).rejects.toThrow()
  })
  it('should return true if acessible and axios does not throw', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce('any value')
    const sut = makeSut()
    expect(await sut.isValid(fakeUrl)).toBeTruthy()
  })
})
