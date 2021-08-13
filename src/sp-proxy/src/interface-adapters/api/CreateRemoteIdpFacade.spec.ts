import { CreateRemoteIdpFacade } from '@sp-proxy/interface-adapters/api/CreateRemoteIdpFacade'
import { fakeCreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/mocks/fakeCreateRemoteIdpRequest.mock'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<any>): Promise<void> {
      // do something cool
    }
  }
  return new ControllerStub()
}
interface SutTypes {
  sut: CreateRemoteIdpFacade
  controllerStub: IController
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new CreateRemoteIdpFacade(controllerStub)
  return {
    sut: sut,
    controllerStub: controllerStub
  }
}

const fakeRequest = fakeCreateRemoteIdpRequest

describe('CreateRemoteIdpFacade', () => {
  describe('createRemoteIdp', () => {
    it('should call controller with correct values', async () => {
      const { sut, controllerStub } = makeSut()
      const handleSpy = jest.spyOn(controllerStub, 'handle')
      await sut.createRemoteIdp(fakeRequest.body)
      expect(handleSpy).toHaveBeenCalledTimes(1)
      expect(handleSpy).toHaveBeenCalledWith({
        id: expect.any(String),
        body: fakeRequest.body
      })
    })
  })
})
