import { GetSamlMetadtaFacade } from '@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { IGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequestMapper'
import { GetExternalDataRequestModel, UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IGetExternalDataInputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'
import * as crypto from 'crypto'
import { EventEmitter } from 'stream'

jest.mock('crypto')

const fakeUseCaseRequest: GetExternalDataRequestModel = {
  requestId: 'valid request id',
  urlOrPath: 'valid path'
}
const fakeUseCaseResponse: IResponseModel<GetExternalDataResponseModel> = {
  requestId: 'valid request id',
  response: {
    externalData: {
      idpSigningCert: ['valid cert 1', 'valid cert 2'],
      singleSignOnServices: [
        {
          location: 'valid location',
          binding: 'valid binding'
        }
      ]
    }
  }
}

const makePresenter = (eventBus: EventEmitter): IGetExternalDataOutputBoundary => {
  class PresenterStub implements IGetExternalDataOutputBoundary {
    present (response: IResponseModel<GetExternalDataResponseModel>): void {
      eventBus.emit(response.requestId, response)
    }
  }
  return new PresenterStub()
}

const makeInteractor = (presenter: IGetExternalDataOutputBoundary): IGetExternalDataInputBoundary => {
  class InteractorStub implements IGetExternalDataInputBoundary {
    constructor (
      private readonly presenter: IGetExternalDataOutputBoundary
    ) {}

    async execute (request: GetExternalDataRequestModel): Promise<void> {
      presenter.present(fakeUseCaseResponse)
    }
  }
  return new InteractorStub(presenter)
}

const makeUrlOrPathValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    isValid (urlOrPath: UrlOrPath): boolean {
      return true
    }
  }
  return new ValidatorStub()
}
const makeExternalRequestMapper = (): IGetExternalDataRequestMapper => {
  class ExternalRequestMapperStub implements IGetExternalDataRequestMapper {
    map (request: IRequest<IGetExternalDataRequest>): GetExternalDataRequestModel {
      return fakeUseCaseRequest
    }
  }
  return new ExternalRequestMapperStub()
}

interface ControllerTypes {
  presenterStub: IGetExternalDataOutputBoundary
  interactorStub: IGetExternalDataInputBoundary
  fileValidatorStub: IValidator
  externalRequestMapperStub: IGetExternalDataRequestMapper
  controllerStub: IController
}

const makeController = (eventBus: EventEmitter): ControllerTypes => {
  const presenterStub = makePresenter(eventBus)
  const interactorStub = makeInteractor(presenterStub)
  const fileValidatorStub = makeUrlOrPathValidator()
  const externalRequestMapperStub = makeExternalRequestMapper()
  class ControllerStub implements IController {
    async handle (request: IRequest<IGetExternalDataRequest>): Promise<void> {
      // do something
    }
  }
  const controllerStub = new ControllerStub()
  // const controllerStub = new GetExternalDataController(
  //   interactorStub,
  //   fileValidatorStub,
  //   externalRequestMapperStub
  // )
  return {
    presenterStub,
    interactorStub,
    fileValidatorStub,
    externalRequestMapperStub,
    controllerStub
  }
}

// register eventBus listener to wait for presenter
// creates the IRequest
// sends IRequest do controller to handle
// "wait(then) for eventBus listener to be triggered
// then return response
interface SutTypes {
  sut: GetSamlMetadtaFacade
  eventEmitter: EventEmitter
  controllerStub: IController
}

const makeSut = (): SutTypes => {
  const eventEmitter = new EventEmitter()
  const { controllerStub } = makeController(eventEmitter)
  const sut = new GetSamlMetadtaFacade(
    eventEmitter, controllerStub
  )
  return {
    sut,
    eventEmitter,
    controllerStub
  }
}

const fakePath = 'valid/path/to.xml'
const fakeUUID = 'valid UUID'

describe('GetSamlMetadadtaFacade', () => {
  it('should register listener with requestId', async () => {
    const { sut, eventEmitter } = makeSut()
    const onceSpy = jest.spyOn(eventEmitter, 'once')
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(
      fakeUUID
    )
    await sut.getFromFile(fakePath)
    expect(onceSpy).toHaveBeenCalledTimes(1)
    expect(onceSpy.mock.calls[0][0]).toBe(fakeUUID)
  })
})
