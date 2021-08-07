import { UrlValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/UrlValidatorAdapter'
import {
  mockGetUrlEndpoints,
  endpoints
} from '../../../../../testdata/mocks/MetadataEndpointMocks'

const makeSut = (): UrlValidatorAdapter => {
  return new UrlValidatorAdapter()
}
describe('UrlValidatorAdapter integration', () => {
  mockGetUrlEndpoints()
  it('should return true if url is acessible and returns', async () => {
    const sut = makeSut()
    expect(await sut.isValid(endpoints.valid)).toBeTruthy()
  })
  it('should return false if url is unreachable', async () => {
    const sut = makeSut()
    expect(await sut.isValid(endpoints.unacessible)).toBeFalsy()
  })
  it('should return false if url returns error code', async () => {
    const sut = makeSut()
    expect(await sut.isValid(endpoints.error)).toBeFalsy()
  })
})
