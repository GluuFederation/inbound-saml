import * as composite from '@get-saml-metadata/interface-adapters/api/factories/makeGetComposite'
import { getFromFile } from '@get-saml-metadata/lib'
import { EventEmitter } from 'stream'
import * as facade from '@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade'
jest.mock(
  '@get-saml-metadata/interface-adapters/api/factories/makeGetComposite'
)
jest.mock('@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade')

describe('lib/GetFromFile', () => {
  it('should call makeGetComposite once', async () => {
    const compositeSpy = jest
      .spyOn(composite, 'makeGetComposite')
      .mockReturnValue({
        handle: jest.fn().mockResolvedValue('')
      })
    await getFromFile('any file')
    expect(compositeSpy).toHaveBeenCalledTimes(1)
    expect(compositeSpy).toHaveBeenCalledWith('file', expect.any(EventEmitter))
  })
  it('should call facade get with correct param', async () => {
    const getSpy = jest.spyOn(facade.GetSamlMetadataFacade.prototype, 'get')
    await getFromFile('any file')
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith('any file')
  })
})
