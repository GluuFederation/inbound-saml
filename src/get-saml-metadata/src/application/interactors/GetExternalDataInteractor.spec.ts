// recebe o request com o urlOrPath
// ele pede pro XmlService carregar o XML
// ele parsa o Xml pra IdpMetadata
// ele gera o RespondeModel com IdpMetadata

// receive request model
// export class urlOrPath extends ValueObject<interface {a: string}>

import { IValidator } from '../../domain/protocols/IValidator'
import { IXmlMetadataLoadService } from '../../domain/services/protocols/IXmlMetadataLoadService'
import { XmlMetadata } from '../../domain/value-objects/XmlMetadata'
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

const makeXmlMetadataLoadService = (): IXmlMetadataLoadService => {
  const validator = makeValidator()
  const xml = 'valid xml'
  class XmlMetadataLoadServiceStub implements IXmlMetadataLoadService {
    load (): XmlMetadata {
      return new XmlMetadata(validator, { xml })
    }
  }
  return new XmlMetadataLoadServiceStub()
}

interface SutTypes {
  sut: IGetExternalDataInputBoundary
  xmlMetadataLoadServiceStub: IXmlMetadataLoadService
}

const makeSut = (): SutTypes => {
  const xmlMetadataLoadServiceStub = makeXmlMetadataLoadService()
  const sut = new GetExternalDataInteractor(xmlMetadataLoadServiceStub)
  return {
    sut,
    xmlMetadataLoadServiceStub
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
    it('should call service load with urlOrPath', async () => {
      const { sut, xmlMetadataLoadServiceStub } = makeSut()
      const xmlMetadataLoadServiceSpy = jest.spyOn(xmlMetadataLoadServiceStub, 'load')
      await sut.execute(fakeRequestModel)
      expect(xmlMetadataLoadServiceSpy).toBeCalledTimes(1)
      // expect(await sut.execute(fakeRequestModel))
    })
  })
})
