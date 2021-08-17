import * as getSamlMetadata from '@get-saml-metadata/lib/index'
import { GetSamlFetchExternalData } from '@sp-proxy/interface-adapters/data/GetSamlFetchExternalData'
jest.mock('@get-saml-metadata/lib/index')

describe('GetSamlFetchExternalData', () => {
  describe('fetch', () => {
    it('should call getFromUrl once with correct url', async () => {
      jest.spyOn(getSamlMetadata, 'getFromUrl')
      const sut = new GetSamlFetchExternalData()
      await sut.fetch('any url')
    })
    it('should throw if getFromUrl throws', () => {
      jest.spyOn(getSamlMetadata, 'getFromUrl').mockImplementationOnce(() => {
        throw new Error()
      })
    })
  })
})
