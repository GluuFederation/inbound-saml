// controller handle() receives IRequest<CreateRemoteIdpController>
// maps to IRequestModel
// calls interactor execute() w/ IRequestModel

import { CreateRemoteIdpController } from '@sp-proxy/interface-adapters/delivery/CreateRemoteIdpController'
import { fakeCreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/mocks/fakeCreateRemoteIdpRequest.mock'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IMapper } from '@sp-proxy/interface-adapters/protocols/IMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { ICreateRemoteIdpInputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpInputBoundary'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

const makeMapper = (): IMapper<
  ICreateRemoteIdpRequest,
  CreateRemoteIdpRequestModel
> => {
  class MapperStub
    implements IMapper<ICreateRemoteIdpRequest, CreateRemoteIdpRequestModel>
  {
    map(
      request: IRequest<ICreateRemoteIdpRequest>
    ): IRequestModel<CreateRemoteIdpRequestModel> {
      return {
        requestId: 'valid id',
        request: {
          name: 'valid name',
          signingCertificates: ['valid cert 1', 'valid cert 2'],
          singleSignOnService: [
            { binding: 'valid binding', location: 'valid location' }
          ]
        }
      }
    }
  }
  return new MapperStub()
}

const makeInteractor = (): ICreateRemoteIdpInputBoundary => {
  class Interactor implements ICreateRemoteIdpInputBoundary {
    async execute(
      request: IRequestModel<CreateRemoteIdpRequestModel>
    ): Promise<void> {
      // do something
    }
  }
  return new Interactor()
}
interface SutTypes {
  sut: CreateRemoteIdpController
  mapperStub: IMapper<ICreateRemoteIdpRequest, CreateRemoteIdpRequestModel>
  interactorStub: ICreateRemoteIdpInputBoundary
}
const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const interactorStub = makeInteractor()
  const sut = new CreateRemoteIdpController(mapperStub, interactorStub)
  return {
    sut: sut,
    mapperStub: mapperStub,
    interactorStub: interactorStub
  }
}

const fakeRequest = fakeCreateRemoteIdpRequest

describe('CreateRemoteIdpController', () => {
  describe('handle', () => {
    it('should call mapper.map once w/ request', async () => {
      const { sut, mapperStub } = makeSut()
      const mapSpy = jest.spyOn(mapperStub, 'map')
      await sut.handle(fakeRequest)
      expect(mapSpy).toHaveBeenCalledTimes(1)
      expect(mapSpy).toHaveBeenCalledWith(fakeRequest)
    })
  })
})
