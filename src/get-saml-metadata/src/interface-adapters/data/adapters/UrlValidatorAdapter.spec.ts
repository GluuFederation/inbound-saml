import { UrlValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/UrlValidatorAdapter'
import axios from 'axios'
const fakeUrl = 'valid url'

const makeSut = (): UrlValidatorAdapter => {
  return new UrlValidatorAdapter()
}
describe('UrlValidatorAdapter', () => {
  it('should call axios get once w/ correct url', () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce('')
    const sut = makeSut()
    sut.isValid(fakeUrl)
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(fakeUrl)
  })
})
