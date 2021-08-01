import { fakeMetadata, validMetadataString, validXmlMetadata } from '../../../testdata/fakes'
import { IExternalData } from '../entities/IExternalData'
import { IMetadata } from '../entities/IMetadataTypes'
import { XmlMetadata } from '../entities/value-objects/XmlMetadata'
import { makeXmlMetadata } from '../interface-adapters/data/factories/makeXmlMetadata'
import { GetExternalDataInteractor } from './GetExternalDataInteractor'
import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from './GetExternalDataResponseModel'
import { IGetExternalDataInputBoundary } from './IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from './IGetExternalDataOutputBoundary'
import { IResponseModel } from './IResponseModel'
import { IExternalDataMapper } from './ports/IExternalDataMapper'
import { IMetadataMapper } from './ports/IMetadataMapper'
import { IXmlMetadataLoaderGateway } from './ports/IXmlMetadataLoaderGateway'

const makePresenter = (): IGetExternalDataOutputBoundary => {
  class PresenterStub implements IGetExternalDataOutputBoundary {
    present (response: IResponseModel<GetExternalDataResponseModel>): void {

    }
  }
  return new PresenterStub()
}

const makeXmlMetadataLoader = (): IXmlMetadataLoaderGateway => {
  class XmlMetadataLoaderStub implements IXmlMetadataLoaderGateway {
    load (urlOrPath: string): XmlMetadata {
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
        .mockReturnValueOnce(validXmlMetadata)
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
