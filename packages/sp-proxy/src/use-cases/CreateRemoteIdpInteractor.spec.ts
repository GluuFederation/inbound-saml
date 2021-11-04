// execute method receive RequestModel
// calls gateway.find (aka repo)
// creates response model
// calls output channel (presenter) w/ ResponseModel

import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { CreateRemoteIdpInteractor } from '@sp-proxy/use-cases/CreateRemoteIdpInteractor'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { AddRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/SuccessResponseUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

const makePresenter = (): OutputBoundary<
  IResponseModel<SuccessResponseUseCaseParams>
> => {
  class PresenterStub
    implements OutputBoundary<IResponseModel<SuccessResponseUseCaseParams>>
  {
    async present(
      response: IResponseModel<SuccessResponseUseCaseParams>
    ): Promise<void> {
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

const fakeRequestDto: IRequestModel<AddRemoteIdpUseCaseParams> = {
  requestId: 'valid id',
  request: {
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

const makeMapper = (): IMapper<
  IRequestModel<AddRemoteIdpUseCaseParams>,
  RemoteIdp
> => {
  class MapperStub
    implements IMapper<IRequestModel<AddRemoteIdpUseCaseParams>, RemoteIdp>
  {
    map(requestModel: IRequestModel<any>): RemoteIdp {
      return new RemoteIdp({
        name: fakeRequestDto.request.name,
        signingCertificates: fakeRequestDto.request.signingCertificates,
        supportedSingleSignOnServices: makeSingleSignOnServices(
          fakeRequestDto.request.singleSignOnService
        )
      })
    }
  }
  return new MapperStub()
}

interface SutTypes {
  sut: CreateRemoteIdpInteractor
  presenter: OutputBoundary<IResponseModel<SuccessResponseUseCaseParams>>
  gateway: ICreateRemoteIdpGateway
  mapper: IMapper<IRequestModel<AddRemoteIdpUseCaseParams>, RemoteIdp>
}

const makeSut = (): SutTypes => {
  const gateway = makeGateway()
  const presenter = makePresenter()
  const mapper = makeMapper()
  const sut = new CreateRemoteIdpInteractor(gateway, presenter, mapper)
  return {
    sut,
    gateway,
    presenter,
    mapper
  }
}

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
      ).toStrictEqual(fakeRequestDto.request.singleSignOnService[0])
    })
    it('should call mapper with request', async () => {
      const { sut, mapper } = makeSut()
      const mapSpy = jest.spyOn(mapper, 'map')
      await sut.execute(fakeRequestDto)
      expect(mapSpy).toHaveBeenCalledTimes(1)
      expect(mapSpy).toHaveBeenCalledWith(fakeRequestDto)
    })
    it('should throw if mapper throws', async () => {
      const { sut, mapper } = makeSut()
      jest.spyOn(mapper, 'map').mockImplementationOnce(() => {
        throw new Error()
      })
      await expect(sut.execute(fakeRequestDto)).rejects.toThrow()
    })
    it('should throw if gateway throws', async () => {
      const { sut, gateway } = makeSut()
      jest.spyOn(gateway, 'create').mockImplementationOnce(() => {
        throw new Error()
      })
      await expect(sut.execute(fakeRequestDto)).rejects.toThrow()
    })
    it('should call presenter with once with success true', async () => {
      const { sut, presenter, gateway } = makeSut()
      const presentSpy = jest.spyOn(presenter, 'present')
      jest.spyOn(gateway, 'create').mockResolvedValueOnce(true)
      await sut.execute(fakeRequestDto)
      expect(presentSpy).toHaveBeenCalledTimes(1)
      expect(presentSpy).toHaveBeenCalledWith({
        requestId: fakeRequestDto.requestId,
        response: {
          success: true
        }
      })
    })
    it('should call presenter with once with success false', async () => {
      const { sut, presenter, gateway } = makeSut()
      const presentSpy = jest.spyOn(presenter, 'present')
      jest.spyOn(gateway, 'create').mockResolvedValueOnce(true)
      await sut.execute(fakeRequestDto)
      expect(presentSpy).toHaveBeenCalledTimes(1)
      expect(presentSpy).toHaveBeenCalledWith({
        requestId: fakeRequestDto.requestId,
        response: {
          success: true
        }
      })
    })
  })
})
