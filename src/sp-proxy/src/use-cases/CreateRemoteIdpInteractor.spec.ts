// execute method receive RequestModel
// calls gateway.find (aka repo)
// creates response model
// calls output channel (presenter) w/ ResponseModel

import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { CreateRemoteIdpInteractor } from '@sp-proxy/use-cases/CreateRemoteIdpInteractor'
import { ICreateRemoteIdpOutputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpOutputBoundary'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { CreateRemoteIdpResponseModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpResponseModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'

const makePresenter = (): ICreateRemoteIdpOutputBoundary => {
  class PresenterStub implements ICreateRemoteIdpOutputBoundary {
    present(response: IResponseModel<CreateRemoteIdpResponseModel>): void {
      // do something
    }
  }
  return new PresenterStub()
}

const makeGateway = (): ICreateRemoteIdpGateway => {
  class GatewayStub implements ICreateRemoteIdpGateway {
    async create(remoteIdp: RemoteIdp): Promise<boolean> {
      // return always true
      return await Promise.resolve(true)
    }
  }
  return new GatewayStub()
}

interface SutTypes {
  sut: CreateRemoteIdpInteractor
  presenter: ICreateRemoteIdpOutputBoundary
  gateway: ICreateRemoteIdpGateway
}

const makeSut = (): SutTypes => {
  const gateway = makeGateway()
  const presenter = makePresenter()
  const sut = new CreateRemoteIdpInteractor(gateway, presenter)
  return {
    sut,
    gateway,
    presenter
  }
}

const fakeRequestDto: CreateRemoteIdpRequestModel = {
  requestId: 'valid id',
  remoteIdp: {
    name: 'valid name',
    signingCertificates: ['valid cert 1', 'valid cert 2'],
    singleSignOnService: [
      {
        binding: 'valid binding',
        location: 'valid location'
      }
    ]
  }
}

// const makeRemoteIdp = (): RemoteIdp => {
//   const props: IRemoteIdpProps = {
//     name: 'whatever',
//     supportedSingleSignOnServices: [],
//     signingCertificates: []
//   }
//   return new RemoteIdp(props)
// }

describe('CreateRemoteIdpInteractor', () => {
  describe('execute', () => {
    it('should call gateway create once w/ Entity', async () => {
      const { sut, gateway } = makeSut()
      const createSpy = jest.spyOn(gateway, 'create')
      await sut.execute(fakeRequestDto)
      expect(createSpy).toHaveBeenCalledTimes(1)
      expect(createSpy.mock.calls[0][0]).toBeInstanceOf(RemoteIdp)
      expect(
        createSpy.mock.calls[0][0].props.supportedSingleSignOnServices[0].props
      ).toStrictEqual(fakeRequestDto.remoteIdp.singleSignOnService[0])
    })
  })
})
