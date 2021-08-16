// receive IRequest
// validate IRequest object
// maps create IRequest to IRequestModel
// calls interactor execute w/ request model

import { GetRemoteIdpController } from '@sp-proxy/interface-adapters/delivery/GetRemoteIdpController'
import { GetByIdDTO } from '@sp-proxy/interface-adapters/protocols/GetByIdDTO'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { GetRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/GetRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

const makeValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    async isValid(
      request: IRequestModel<GetRemoteIdpRequestModel>
    ): Promise<boolean> {
      return true
    }
  }
  return new ValidatorStub()
}

const makeDtoMapper = (): IDeliveryMapper<
  IRequest<GetByIdDTO>,
  IRequestModel<GetRemoteIdpRequestModel>
> => {
  class DtoMapperStub
    implements
      IDeliveryMapper<
        IRequest<GetByIdDTO>,
        IRequestModel<GetRemoteIdpRequestModel>
      >
  {
    map(dto: IRequest<GetByIdDTO>): IRequestModel<GetRemoteIdpRequestModel> {
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

const makeInteractor = (): InputBoundary<GetRemoteIdpRequestModel> => {
  class InteractorStub implements InputBoundary<GetRemoteIdpRequestModel> {
    async execute(
      request: IRequestModel<GetRemoteIdpRequestModel>
    ): Promise<void> {
      // do something
    }
  }
  return new InteractorStub()
}

interface SutTypes {
  sut: GetRemoteIdpController
  interactorStub: InputBoundary<GetRemoteIdpRequestModel>
  validatorStub: IValidator
  dtoMapperStub: IDeliveryMapper<
    IRequest<GetByIdDTO>,
    IRequestModel<GetRemoteIdpRequestModel>
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
  it('shoult throw if mapper throws', async () => {
    const { sut, dtoMapperStub } = makeSut()
    jest.spyOn(dtoMapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
  })
})
