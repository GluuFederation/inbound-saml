import { IExternalData } from '@get-saml-metadata/entities/IExternalData'
import { IMetadata } from '@get-saml-metadata/entities/IMetadataTypes'
import { XmlMetadata } from '@get-saml-metadata/entities/value-objects/XmlMetadata'
import { makeXmlMetadata } from '@get-saml-metadata/interface-adapters/data/factories/makeXmlMetadata'
import { InvalidPathOrUrlError } from '@get-saml-metadata/interface-adapters/delivery/errors/InvalidPathOrUrlError'
import { GetExternalDataController } from '@get-saml-metadata/interface-adapters/delivery/GetExternalDataController'
import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { IGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequestMapper'
import { GetExternalDataInteractor } from '@get-saml-metadata/use-cases/GetExternalDataInteractor'
import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import {
  BaseGetExternalDataInteractor,
  IGetExternalDataInputBoundary
} from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { IExternalDataMapper } from '@get-saml-metadata/use-cases/ports/IExternalDataMapper'
import { IMetadataMapper } from '@get-saml-metadata/use-cases/ports/IMetadataMapper'
import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'
import { EventEmitter } from 'stream'
import { fakeMetadata, validMetadataString } from '../../../../testdata/fakes'

jest.mock('../../use-cases/GetExternalDataInteractor')

const makeMapper = (): IGetExternalDataRequestMapper => {
  class RequestMapperStub implements IGetExternalDataRequestMapper {
    map(request: IRequest<any>): GetExternalDataRequestModel {
      return {
        requestId: 'valid id',
        urlOrPath: 'valid/path'
      }
    }
  }
  return new RequestMapperStub()
}

const makeRequestValidator = (): IValidator => {
  class RequestvalidatorStub implements IValidator {
    async isValid(urlOrPath: 'string'): Promise<boolean> {
      return true
    }
  }
  return new RequestvalidatorStub()
}

const makeGetExternalDataInteractor = (): BaseGetExternalDataInteractor => {
  class ExternalDataInteractorStub
    extends BaseGetExternalDataInteractor
    implements IGetExternalDataInputBoundary
  {
    async execute(request: GetExternalDataRequestModel): Promise<void> {}
  }
  return new ExternalDataInteractorStub(
    makeXmlMetadataLoader(),
    makeMetadataMapper(),
    makeExternalDataMapper(),
    makePresenter()
  )
}

// We also need to test with concrete interactor:

const makePresenter = (
  emiter?: EventEmitter
): IGetExternalDataOutputBoundary => {
  class PresenterStub implements IGetExternalDataOutputBoundary {
    async present(
      response: IResponseModel<GetExternalDataResponseModel>
    ): Promise<void> {
      if (emiter != null) {
        emiter.emit(response.requestId, response)
      }
    }
  }
  return new PresenterStub()
}

const makeXmlMetadataLoader = (): IXmlMetadataLoaderGateway => {
  class XmlMetadataLoaderStub implements IXmlMetadataLoaderGateway {
    async load(urlOrPath: string): Promise<XmlMetadata> {
      return makeXmlMetadata({ xml: validMetadataString })
    }
  }
  return new XmlMetadataLoaderStub()
}

const makeMetadataMapper = (): IMetadataMapper => {
  class MetadataMapperStub implements IMetadataMapper {
    map(xmlData: string): IMetadata {
      return fakeMetadata
    }
  }
  return new MetadataMapperStub()
}

const makeExternalDataMapper = (): IExternalDataMapper => {
  class ExternalDataMapperStub implements IExternalDataMapper {
    map(metadata: IMetadata): IExternalData {
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

const makeConcreteInteractor = (): BaseGetExternalDataInteractor => {
  return new GetExternalDataInteractor(
    makeXmlMetadataLoader(),
    makeMetadataMapper(),
    makeExternalDataMapper(),
    makePresenter()
  )
}

interface sutType {
  sut: GetExternalDataController
  externalDataInteractorStub: BaseGetExternalDataInteractor
  requestValidatorStub: IValidator
  requestMapperStub: IGetExternalDataRequestMapper
  presenter: IGetExternalDataOutputBoundary
  emiter: EventEmitter
}

/**
 * @param concreteInteractor - If true, will use the concrete
 * interactor instead of stub implementation
 * @returns sutType
 */
const makeSut = (concreteInteractor: boolean): sutType => {
  const emiter = new EventEmitter()
  const requestValidatorStub = makeRequestValidator()
  const externalDataInteractorStub = concreteInteractor
    ? makeConcreteInteractor()
    : makeGetExternalDataInteractor()
  const requestMapperStub = makeMapper()
  const presenter = makePresenter(emiter)
  const sut = new GetExternalDataController(
    externalDataInteractorStub,
    requestValidatorStub,
    requestMapperStub
  )
  return {
    sut,
    externalDataInteractorStub,
    requestValidatorStub,
    requestMapperStub,
    presenter,
    emiter
  }
}

const validRequest: IRequest<IGetExternalDataRequest> = {
  id: 'valid id',
  request: {
    source: 'file',
    urlOrPath: 'valid path'
  }
}
describe('GetExternalDataController', () => {
  describe('with input boundary stub', () => {
    it('should call isValid once with correct params', async () => {
      const { sut, requestValidatorStub } = makeSut(false)
      const isValidSpy = jest.spyOn(requestValidatorStub, 'isValid')
      await sut.handle(validRequest)
      expect(isValidSpy).toHaveBeenCalledTimes(1)
      expect(isValidSpy).toHaveBeenCalledWith(validRequest.request.urlOrPath)
    })
    it('should throw InvalidUrlOrPathError if validator returns false', async () => {
      const { sut, requestValidatorStub } = makeSut(false)
      jest.spyOn(requestValidatorStub, 'isValid').mockResolvedValueOnce(false)
      const promise = sut.handle(validRequest)
      await expect(promise).rejects.toThrow(
        new InvalidPathOrUrlError(validRequest.request.urlOrPath)
      )
    })
    it('should call map with request object', async () => {
      const { sut, requestMapperStub } = makeSut(false)
      const mapSpy = jest.spyOn(requestMapperStub, 'map')
      await sut.handle(validRequest)
      expect(mapSpy).toHaveBeenCalledWith(validRequest)
      expect(mapSpy).toHaveBeenCalledTimes(1)
    })
    it('should call input execute with request model', async () => {
      const { sut, externalDataInteractorStub, requestMapperStub } =
        makeSut(false)
      jest.spyOn(requestMapperStub, 'map').mockReturnValueOnce({
        requestId: validRequest.id,
        urlOrPath: validRequest.request.urlOrPath
      })
      const executeSpy = jest.spyOn(externalDataInteractorStub, 'execute')
      await sut.handle(validRequest)
      const expected: GetExternalDataRequestModel = {
        requestId: validRequest.id,
        urlOrPath: validRequest.request.urlOrPath
      }
      expect(executeSpy).toHaveBeenCalledTimes(1)
      expect(executeSpy).toHaveBeenCalledWith(expected)
    })
  })
  describe('with real concrete interactor', () => {
    it('should call input execute with request model', async () => {
      const { sut, externalDataInteractorStub, requestMapperStub } =
        makeSut(true)
      jest.spyOn(requestMapperStub, 'map').mockReturnValueOnce({
        requestId: validRequest.id,
        urlOrPath: validRequest.request.urlOrPath
      })
      const executeSpy = jest.spyOn(externalDataInteractorStub, 'execute')
      await sut.handle(validRequest)
      const expected: GetExternalDataRequestModel = {
        requestId: validRequest.id,
        urlOrPath: validRequest.request.urlOrPath
      }
      expect(executeSpy).toHaveBeenCalledTimes(1)
      expect(executeSpy).toHaveBeenCalledWith(expected)
    })
  })
})
