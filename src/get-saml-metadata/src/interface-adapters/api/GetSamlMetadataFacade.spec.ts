import { GetSamlMetadataFacade } from '@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import * as crypto from 'crypto'
import { EventEmitter } from 'stream'
jest.mock('crypto')
jest.mock(
  '@get-saml-metadata/interface-adapters/delivery/GetExternalDataPresenter'
)

const fakePath = 'valid/path/to.xml'
const fakeUUID = 'valid UUID'

const fakeUseCaseRequest: GetExternalDataRequestModel = {
  requestId: fakeUUID,
  urlOrPath: fakePath
}
const fakeUseCaseResponse: IResponseModel<GetExternalDataResponseModel> = {
  requestId: fakeUUID,
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

const makeController = (eventBus: EventEmitter): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<IGetExternalDataRequest>): Promise<void> {}
  }
  return new ControllerStub()
}

// register eventBus listener to wait for presenter
// creates the IRequest
// sends IRequest do controller to handle
// "wait(then) for eventBus listener to be triggered
// then return response
interface SutTypes {
  sut: GetSamlMetadataFacade
  eventEmitter: EventEmitter
  controllerStub: IController
}

const makeSut = (): SutTypes => {
  const eventEmitter = new EventEmitter()
  // jest.spyOn(GetExternalDataPresenter.prototype, 'present').mockImplementation(

  // )
  const controllerStub = makeController(eventEmitter)
  // fake event emited by presenter
  jest.spyOn(controllerStub as any, 'handle').mockImplementation(() => {
    eventEmitter.emit(fakeUUID, fakeUseCaseResponse)
  })
  const sut = new GetSamlMetadataFacade(eventEmitter, controllerStub)
  return {
    sut,
    eventEmitter,
    controllerStub
  }
}

describe('GetSamlMetadadtaFacade', () => {
  it('should register listener with requestId', async () => {
    const { sut, eventEmitter } = makeSut()
    const onceSpy = jest.spyOn(eventEmitter, 'once')
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(fakeUUID)
    await sut.getFromFile(fakePath)
    expect(onceSpy).toHaveBeenCalledTimes(1)
    expect(onceSpy.mock.calls[0][0]).toBe(fakeUUID)
  })

  it('should register listener with function', async () => {
    const { sut, eventEmitter } = makeSut()
    const onceSpy = jest.spyOn(eventEmitter, 'once')
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(fakeUUID)
    await sut.getFromFile(fakePath)
    expect(typeof onceSpy.mock.calls[0][1]).toBe('function')
  })

  it('should call controller handle with valid request', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(fakeUUID)
    await sut.getFromFile(fakePath)
    const expectedRequest: IRequest<IGetExternalDataRequest> = {
      id: fakeUUID,
      request: {
        source: 'file',
        urlOrPath: fakeUseCaseRequest.urlOrPath
      }
    }
    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith(expectedRequest)
  })

  it('should call push on event emit', async () => {
    // controller emit event just for stubbing presenter action
    const pushSpy = jest.spyOn(Array.prototype as any, 'push')
    const { sut } = makeSut()
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(fakeUUID)
    await sut.getFromFile(fakePath)
    expect(pushSpy).toHaveBeenCalledTimes(1)
  })

  it('should return valid IFetchedData', async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(fakeUUID)
    const { sut } = makeSut()
    const result = await sut.getFromFile(fakePath)
    expect(result).toEqual({
      idpSigningCert: expect.anything(),
      singleSignOnServices: expect.any(Array)
    })
  })

  it('should return expected IFetchedData', async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(fakeUUID)
    const { sut } = makeSut()
    const result = await sut.getFromFile(fakePath)
    expect(result).toStrictEqual({
      idpSigningCert: fakeUseCaseResponse.response.externalData.idpSigningCert,
      singleSignOnServices:
        fakeUseCaseResponse.response.externalData.singleSignOnServices
    })
  })
})
