// receives IRequest dto
// validates received request
// maps to IRequestModel
// calls interactor execute w/ IRequestModel

import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

const makeMapper = (): IDeliveryMapper<
  IRequest<IAddTrFromMetadataRequest>,
  IRequestModel<AddTrFromMetadataUseCaseProps>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IRequest<IAddTrFromMetadataRequest>,
        IRequestModel<AddTrFromMetadataUseCaseProps>
      >
  {
    map(
      request: IRequest<IAddTrFromMetadataRequest>
    ): IRequestModel<AddTrFromMetadataUseCaseProps> {
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

const makeInteractor = (): InputBoundary<AddTrFromMetadataUseCaseProps> => {
  class InteractorStub implements InputBoundary<AddTrFromMetadataUseCaseProps> {
    async execute(
      request: IRequestModel<AddTrFromMetadataUseCaseProps>
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
    IRequestModel<AddTrFromMetadataUseCaseProps>
  >
  interactorStub: InputBoundary<AddTrFromMetadataUseCaseProps>
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
})
