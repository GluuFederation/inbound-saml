import { UrlValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/UrlValidatorAdapter'
import {
  mockGetUrlEndpoints,
  endpoints
} from '@test-data/mocks/MetadataEndpointMocks'

const makeSut = (): UrlValidatorAdapter => {
  return new UrlValidatorAdapter()
}
describe('UrlValidatorAdapter integration', () => {
  mockGetUrlEndpoints()
  it('should return true if url is acessible and returns', async () => {
    const sut = makeSut()
    expect(await sut.isValid(endpoints.valid)).toBeTruthy()
  })
  it('should throw if url is unreachable', async () => {
    const sut = makeSut()
    await expect(sut.isValid(endpoints.unacessible)).rejects.toThrow()
  })
  it('should throw if url returns error code', async () => {
    const sut = makeSut()
    await expect(sut.isValid(endpoints.error)).rejects.toThrow()
  })
})
