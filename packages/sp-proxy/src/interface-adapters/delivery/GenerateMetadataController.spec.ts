// receive IRequest dto
// map to Resuquest Model
// calls interactor

import { IGenerateMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataRequest'
import { GenerateMetadataController } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GenerateMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

const makeMapper = (): IDeliveryMapper<
  IRequest<IGenerateMetadataRequest>,
  IRequestModel<GenerateMetadataRequestUseCaseParams>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IRequest<IGenerateMetadataRequest>,
        IRequestModel<GenerateMetadataRequestUseCaseParams>
      >
  {
    map(
      mapFrom: IRequest<IGenerateMetadataRequest>
    ): IRequestModel<GenerateMetadataRequestUseCaseParams> {
      return {
        requestId: 'stubbed request id',
        request: 'GenerateSpMetadata'
      }
    }
  }
  return new MapperStub()
}

const makeInteractor =
  (): InputBoundary<GenerateMetadataRequestUseCaseParams> => {
    class InteractorStub
      implements InputBoundary<GenerateMetadataRequestUseCaseParams>
    {
      async execute(
        request: IRequestModel<GenerateMetadataRequestUseCaseParams>
      ): Promise<void> {}
      // do something
    }
    return new InteractorStub()
  }

interface SutTypes {
  sut: GenerateMetadataController
  mapperStub: IDeliveryMapper<
    IRequest<IGenerateMetadataRequest>,
    IRequestModel<GenerateMetadataRequestUseCaseParams>
  >
  interactorStub: InputBoundary<GenerateMetadataRequestUseCaseParams>
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const interactorStub = makeInteractor()
  const sut = new GenerateMetadataController(mapperStub, interactorStub)
  return {
    sut,
    mapperStub,
    interactorStub
  }
}

const fakeRequestDto: IRequest<IGenerateMetadataRequest> = {
  id: 'fake request id',
  body: 'generate metadata request'
}

describe('GenerateMetadataController', () => {
  it('should call mapper once w/ received dto', async () => {
    const { mapperStub, sut } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.handle(fakeRequestDto)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeRequestDto)
  })
  it('should call interactor with mapped request model', async () => {
    const { sut, interactorStub, mapperStub } = makeSut()
    const executeSpy = jest.spyOn(interactorStub, 'execute')
    jest
      .spyOn(mapperStub as any, 'map')
      .mockReturnValueOnce('mapped request model')
    await sut.handle(fakeRequestDto)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('mapped request model')
  })
  it('should throw if mapper throws', async () => {
    const { sut, mapperStub } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequestDto)).rejects.toThrow()
  })
  it('should throw if interactor throws', async () => {
    const { sut, interactorStub } = makeSut()
    jest.spyOn(interactorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequestDto)).rejects.toThrow()
  })
})
