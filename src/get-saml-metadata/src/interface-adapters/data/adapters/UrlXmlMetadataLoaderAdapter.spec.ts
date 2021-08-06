import { UrlXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/UrlXmlMetadataLoaderAdapter'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'
import axios from 'axios'

const makeSut = (): IXmlMetadataLoaderGateway => {
  return new UrlXmlMetadataLoaderAdapter()
}
const fakeUrl = 'valid.com/url'
const validXml = '<root> valid xml </root>'

describe('UrlXmlMetadataLoaderAdapter', () => {
  it('should call axios.get with the correct params', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(axios as any, 'get')
      .mockReturnValueOnce(Promise.resolve({ data: validXml }))
    await sut.load(fakeUrl)
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(fakeUrl)
  })
  it('should return valid XmlMetaData object', async () => {
    jest.spyOn(axios as any, 'get')
      .mockReturnValueOnce(Promise.resolve({ data: validXml }))
    const sut = makeSut()
    const result = await sut.load(fakeUrl)
    expect(result.props.xml).toBe(validXml)
  })
})
