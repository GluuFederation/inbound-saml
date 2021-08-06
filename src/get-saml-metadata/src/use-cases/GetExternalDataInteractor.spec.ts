import { IExternalData } from '@get-saml-metadata/entities/IExternalData'
import { IMetadata } from '@get-saml-metadata/entities/IMetadataTypes'
import { XmlMetadata } from '@get-saml-metadata/entities/value-objects/XmlMetadata'
import { makeXmlMetadata } from '@get-saml-metadata/interface-adapters/data/factories/makeXmlMetadata'
import { GetExternalDataInteractor } from '@get-saml-metadata/use-cases/GetExternalDataInteractor'
import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IGetExternalDataInputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { IExternalDataMapper } from '@get-saml-metadata/use-cases/ports/IExternalDataMapper'
import { IMetadataMapper } from '@get-saml-metadata/use-cases/ports/IMetadataMapper'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'
import { fakeMetadata, validMetadataString, validXmlMetadata } from '../../../testdata/fakes'

const makePresenter = (): IGetExternalDataOutputBoundary => {
  class PresenterStub implements IGetExternalDataOutputBoundary {
    present (response: IResponseModel<GetExternalDataResponseModel>): void {

    }
  }
  return new PresenterStub()
}

const makeXmlMetadataLoader = (): IXmlMetadataLoaderGateway => {
  class XmlMetadataLoaderStub implements IXmlMetadataLoaderGateway {
    async load (urlOrPath: string): Promise<XmlMetadata> {
      return makeXmlMetadata({ xml: validMetadataString })
    }
  }
  return new XmlMetadataLoaderStub()
}

const makeMetadataMapper = (): IMetadataMapper => {
  class MetadataMapperStub implements IMetadataMapper {
    map (xmlData: string): IMetadata {
      return fakeMetadata
    }
  }
  return new MetadataMapperStub()
}

const makeExternalDataMapper = (): IExternalDataMapper => {
  class ExternalDataMapperStub implements IExternalDataMapper {
    map (metadata: IMetadata): IExternalData {
      return {
        idpSigningCert: ['valid cert 1', 'valid cert 2'],
        singleSignOnServices: [
          {
            binding: 'valid binding',
            location: 'valid location'
          }
        ]
      }
    }
  }
  return new ExternalDataMapperStub()
}

interface SutTypes {
  sut: IGetExternalDataInputBoundary
  xmlMetadataLoaderStub: IXmlMetadataLoaderGateway
  metadataMapperStub: IMetadataMapper
  externalDataMapperStub: IExternalDataMapper
  presenterStub: IGetExternalDataOutputBoundary
}

const makeSut = (): SutTypes => {
  const metadataMapperStub = makeMetadataMapper()
  const xmlMetadataLoaderStub = makeXmlMetadataLoader()
  const externalDataMapperStub = makeExternalDataMapper()
  const presenterStub = makePresenter()
  const sut = new GetExternalDataInteractor(
    xmlMetadataLoaderStub,
    metadataMapperStub,
    externalDataMapperStub,
    presenterStub
  )
  return {
    sut,
    xmlMetadataLoaderStub,
    metadataMapperStub,
    externalDataMapperStub,
    presenterStub
  }
}

const fakeRequestModel: GetExternalDataRequestModel = {
  requestId: 'valid request id',
  urlOrPath: '/valid/url/or/path.xml'
}

describe('GetExternalDataInteractor', () => {
  describe('execute() method', () => {
    it('should call loader with urlOrPath', async () => {
      const { sut, xmlMetadataLoaderStub } = makeSut()
      const loadSpy = jest.spyOn(xmlMetadataLoaderStub, 'load')
      await sut.execute(fakeRequestModel)
      expect(loadSpy).toBeCalledTimes(1)
      expect(loadSpy).toHaveBeenCalledWith(fakeRequestModel.urlOrPath)
    })
    it('should call MetadataMapper.map', async () => {
      const { sut, metadataMapperStub, xmlMetadataLoaderStub } = makeSut()
      jest.spyOn(xmlMetadataLoaderStub, 'load')
        .mockReturnValueOnce(Promise.resolve(validXmlMetadata))
      const mapSpy = jest.spyOn(metadataMapperStub, 'map')
      await sut.execute(fakeRequestModel)
      expect(mapSpy).toHaveBeenCalledWith(validXmlMetadata.props.xml)
    })
    it('should call ExternalData.map with mapped metadata', async () => {
      const { sut, metadataMapperStub, externalDataMapperStub } = makeSut()
      jest.spyOn(metadataMapperStub, 'map').mockReturnValue(fakeMetadata)
      const mapSpy = jest.spyOn(externalDataMapperStub, 'map')
      await sut.execute(fakeRequestModel)
      expect(mapSpy).toHaveBeenCalledTimes(1)
      expect(mapSpy).toHaveBeenCalledWith(fakeMetadata)
    })
    it('should call the presenter with response model with correct values', async () => {
      const { sut, presenterStub } = makeSut()
      const presentSpy = jest.spyOn(presenterStub, 'present')
      const mapper = makeExternalDataMapper()
      const expectedResponseModel = {
        requestId: fakeRequestModel.requestId,
        response: {
          externalData: mapper.map(fakeMetadata)
        }
      }
      await sut.execute(fakeRequestModel)
      expect(presentSpy).toHaveBeenCalledWith(expectedResponseModel)
    })
  })
})
