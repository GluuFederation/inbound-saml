// recebe o request com o urlOrPath
// ele pede pro XmlService carregar o XML
// ele parsa o Xml pra objeto que impl IMetadata
// ele adapta para IExternalData
// ele gera o RespondeModel com IdpMetadata

// receive request model
// export class urlOrPath extends ValueObject<interface {a: string}>

import { fakeMetadata, validMetadataString, validXmlMetadata } from '../../../../testdata/fakes'
import { makeXmlMetadata } from '../../domain/factories/makeXmlMetadata'
import { IValidator } from '../../domain/protocols/IValidator'
import { IXmlMetadataLoaderRepository } from '../../domain/utils/IXmlMetadataLoaderRepository'
import { XmlMetadata } from '../../domain/value-objects/XmlMetadata'
import { IExternalData } from '../protocols/IExternalData'
import { IExternalDataMapper } from '../protocols/IExternalDataMapper'
import { IMetadataMapper } from '../protocols/IMetadataMapper'
import { IMetadata } from '../protocols/IMetadataTypes'
import { GetExternalDataInteractor } from './GetExternalDataInteractor'
import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'
import { IGetExternalDataInputBoundary } from './IGetExternalDataInputBoundary'

export interface IGetExternalDataOutputBoundary {
  any: any
}

const makeValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    isValid (arg: any): boolean {
      return true
    }
  }
  return new ValidatorStub()
}

const makeXmlMetadataLoader = (): IXmlMetadataLoaderRepository => {
  class XmlMetadataLoaderStub implements IXmlMetadataLoaderRepository {
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
  xmlMetadataLoaderStub: IXmlMetadataLoaderRepository
  metadataMapperStub: IMetadataMapper
  externalDataMapperStub: IExternalDataMapper
}

const makeSut = (): SutTypes => {
  const metadataMapperStub = makeMetadataMapper()
  const xmlMetadataLoaderStub = makeXmlMetadataLoader()
  const externalDataMapperStub = makeExternalDataMapper()
  const sut = new GetExternalDataInteractor(
    xmlMetadataLoaderStub, metadataMapperStub, externalDataMapperStub
  )
  return {
    sut,
    xmlMetadataLoaderStub,
    metadataMapperStub,
    externalDataMapperStub
  }
}

const fakeRequestModel: GetExternalDataRequestModel = {
  requestId: 'valid request id',
  urlOrPath: '/valid/url/or/path.xml'
}

describe('GetExternalDataInteractor', () => {
  describe('execute() method', () => {
    it('void should return undefined', async () => {
      const { sut } = makeSut()
      expect(await sut.execute(fakeRequestModel)).toBeUndefined()
    })
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
  })
})
