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
  it('should return false if no response', async () => {
    const noResponseUrl = 'no response url'
    const axiosError = {
      request: 'unreachable'
    }
    jest.spyOn(axios, 'get').mockRejectedValueOnce({ axiosError })
    const sut = makeSut()
    expect(await sut.isValid(noResponseUrl)).toBeFalsy()
  })
  it('should return false if axios error.response', async () => {
    const errorResponseUrl = 'error response url'
    const axiosError = {
      response: 'valid error'
    }
    jest.spyOn(axios, 'get').mockRejectedValueOnce({ axiosError })
    const sut = makeSut()
    expect(await sut.isValid(errorResponseUrl)).toBeFalsy()
  })
})
