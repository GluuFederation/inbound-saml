// receive IRequest
// validate IRequest object
// maps create IRequest to IRequestModel
// calls interactor execute w/ request model

import { GetRemoteIdpController } from '@sp-proxy/interface-adapters/delivery/GetRemoteIdpController'
import { GetByIdDTO } from '@sp-proxy/interface-adapters/protocols/GetByIdDTO'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { GetRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/GetRemoteIdpUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

const makeValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    async isValid(
      request: IRequestModel<GetRemoteIdpUseCaseParams>
    ): Promise<boolean> {
      return true
    }
  }
  return new ValidatorStub()
}

const makeDtoMapper = (): IDeliveryMapper<
  IRequest<GetByIdDTO>,
  IRequestModel<GetRemoteIdpUseCaseParams>
> => {
  class DtoMapperStub
    implements
      IDeliveryMapper<
        IRequest<GetByIdDTO>,
        IRequestModel<GetRemoteIdpUseCaseParams>
      >
  {
    map(dto: IRequest<GetByIdDTO>): IRequestModel<GetRemoteIdpUseCaseParams> {
      return {
        requestId: 'valid request id',
        request: {
          id: 'valid remote idp id'
        }
      }
    }
  }
  return new DtoMapperStub()
}

const makeInteractor = (): InputBoundary<GetRemoteIdpUseCaseParams> => {
  class InteractorStub implements InputBoundary<GetRemoteIdpUseCaseParams> {
    async execute(
      request: IRequestModel<GetRemoteIdpUseCaseParams>
    ): Promise<void> {
      // do something
    }
  }
  return new InteractorStub()
}

interface SutTypes {
  sut: GetRemoteIdpController
  interactorStub: InputBoundary<GetRemoteIdpUseCaseParams>
  validatorStub: IValidator
  dtoMapperStub: IDeliveryMapper<
    IRequest<GetByIdDTO>,
    IRequestModel<GetRemoteIdpUseCaseParams>
  >
}

const makeSut = (): SutTypes => {
  const interactorStub = makeInteractor()
  const validatorStub = makeValidator()
  const dtoMapperStub = makeDtoMapper()
  const sut = new GetRemoteIdpController(
    interactorStub,
    validatorStub,
    dtoMapperStub
  )
  return {
    sut,
    interactorStub,
    validatorStub,
    dtoMapperStub
  }
}

const fakeRequest: IRequest<GetByIdDTO> = {
  id: 'request id',
  body: {
    id: 'entity id'
  }
}

describe('GetRemoteIdpController', () => {
  it('shoud call isValid once with received request', async () => {
    const { sut, validatorStub } = makeSut()
    const isValidSpy = jest.spyOn(validatorStub, 'isValid')
    await sut.handle(fakeRequest)
    expect(isValidSpy).toHaveBeenCalledTimes(1)
    expect(isValidSpy).toHaveBeenCalledWith(fakeRequest)
  })
  it('should throw if validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
  })
  it('should call mapper once with request value', async () => {
    const { sut, dtoMapperStub } = makeSut()
    const mapSpy = jest.spyOn(dtoMapperStub, 'map')
    await sut.handle(fakeRequest)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeRequest)
  })
  it('should throw if mapper throws', async () => {
    const { sut, dtoMapperStub } = makeSut()
    jest.spyOn(dtoMapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
  })
  it('should call interactor with mapper response', async () => {
    const { sut, dtoMapperStub, interactorStub } = makeSut()
    const executeSpy = jest.spyOn(interactorStub, 'execute')
    jest
      .spyOn(dtoMapperStub as any, 'map')
      .mockReturnValueOnce('mapper response')
    await sut.handle(fakeRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('mapper response')
  })
  it('should throw if interactor throws', async () => {
    const { sut, interactorStub } = makeSut()
    jest.spyOn(interactorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
  })
})
