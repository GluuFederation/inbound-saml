// receives IRequest dto
// validates received request
// maps to IRequestModel
// calls interactor execute w/ IRequestModel

import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddTrFromMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddTrFromMetadataRequestUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

const makeMapper = (): IDeliveryMapper<
  IRequest<IAddTrFromMetadataRequest>,
  IRequestModel<AddTrFromMetadataRequestUseCaseParams>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IRequest<IAddTrFromMetadataRequest>,
        IRequestModel<AddTrFromMetadataRequestUseCaseParams>
      >
  {
    map(
      request: IRequest<IAddTrFromMetadataRequest>
    ): IRequestModel<AddTrFromMetadataRequestUseCaseParams> {
      return {
        requestId: 'valid request id',
        request: {
          name: 'valid name',
          url: 'valid url'
        }
      }
    }
  }
  return new MapperStub()
}

const makeInteractor =
  (): InputBoundary<AddTrFromMetadataRequestUseCaseParams> => {
    class InteractorStub
      implements InputBoundary<AddTrFromMetadataRequestUseCaseParams>
    {
      async execute(
        request: IRequestModel<AddTrFromMetadataRequestUseCaseParams>
      ): Promise<void> {
        // do something
      }
    }
    return new InteractorStub()
  }

const makeValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    async isValid(value: any): Promise<boolean> {
      return true
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  sut: AddTrFromMetadataController
  mapperStub: IDeliveryMapper<
    IRequest<IAddTrFromMetadataRequest>,
    IRequestModel<AddTrFromMetadataRequestUseCaseParams>
  >
  interactorStub: InputBoundary<AddTrFromMetadataRequestUseCaseParams>
  validatorStub: IValidator
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const interactorStub = makeInteractor()
  const validatorStub = makeValidator()
  const sut = new AddTrFromMetadataController(
    mapperStub,
    interactorStub,
    validatorStub
  )
  return {
    sut,
    mapperStub,
    interactorStub,
    validatorStub
  }
}

const fakeRequestDto: IRequest<IAddTrFromMetadataRequest> = {
  id: 'another valid request id',
  body: {
    name: 'another valid name',
    url: 'another valid url'
  }
}

describe('AddTrFromMetadataController', () => {
  it('should call isValid with received request', async () => {
    const { sut, validatorStub } = makeSut()
    const isValidSpy = jest.spyOn(validatorStub, 'isValid')
    await sut.handle(fakeRequestDto)
    expect(isValidSpy).toHaveBeenCalledTimes(1)
    expect(isValidSpy).toHaveBeenCalledWith(fakeRequestDto)
  })
  it('should throw if Validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequestDto)).rejects.toThrow()
  })
  it('should call mapper with received request', async () => {
    const { sut, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.handle(fakeRequestDto)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeRequestDto)
  })
  it('should throw if mapper throws', async () => {
    const { sut, mapperStub } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequestDto)).rejects.toThrow()
  })
  it('should call interactor with response model returned from mapper', async () => {
    const { sut, mapperStub, interactorStub } = makeSut()
    const executeSpy = jest.spyOn(interactorStub, 'execute')
    jest
      .spyOn(mapperStub as any, 'map')
      .mockReturnValueOnce('a valid mapped request model')
    await sut.handle(fakeRequestDto)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('a valid mapped request model')
  })
  it('should throw if interactor throws', async () => {
    const { sut, interactorStub } = makeSut()
    jest.spyOn(interactorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequestDto)).rejects.toThrow()
  })
})
