// receive request dto (IRequest)
// validates request
// maps to request model
// dispatch to usecase interactor

import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { GetTrByHostController } from '@sp-proxy/interface-adapters/delivery/GetTrByHostController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetTrByHostRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

const makeMapper = (): IDeliveryMapper<
  IRequest<IGetTrByHostRequest>,
  IRequestModel<GetTrByHostRequestUseCaseParams>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IRequest<IGetTrByHostRequest>,
        IRequestModel<GetTrByHostRequestUseCaseParams>
      >
  {
    map(
      mapFrom: IRequest<IGetTrByHostRequest>
    ): IRequestModel<GetTrByHostRequestUseCaseParams> {
      return {
        requestId: 'stubbed requestId',
        request: {
          host: 'stubbed host'
        }
      }
    }
  }
  return new MapperStub()
}

const makeInteractor = (): InputBoundary<GetTrByHostRequestUseCaseParams> => {
  class InteractorStub
    implements InputBoundary<GetTrByHostRequestUseCaseParams>
  {
    async execute(
      request: IRequestModel<GetTrByHostRequestUseCaseParams>
    ): Promise<void> {
      // do something
    }
  }
  return new InteractorStub()
}

const makeValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    async isValid(request: any): Promise<boolean> {
      return true
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  sut: GetTrByHostController
  mapperStub: IDeliveryMapper<
    IRequest<IGetTrByHostRequest>,
    IRequestModel<GetTrByHostRequestUseCaseParams>
  >
  interactorStub: InputBoundary<GetTrByHostRequestUseCaseParams>
  validatorStub: IValidator
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const interactorStub = makeInteractor()
  const validatorStub = makeValidator()
  const sut = new GetTrByHostController(
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

const fakeRequest: IRequest<IGetTrByHostRequest> = {
  id: 'fake request id',
  body: {
    host: 'fake host'
  }
}

describe('GetByTrHostController', () => {
  it('should call mapper with received dto', async () => {
    const { mapperStub, sut } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.handle(fakeRequest)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeRequest)
  })
  it('should throw if mapper throws', async () => {
    const { mapperStub, sut } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
  })
  it('should call interactor with mapped resquest model', async () => {
    const { sut, mapperStub, interactorStub } = makeSut()
    jest
      .spyOn(mapperStub, 'map')
      .mockReturnValueOnce('mapped request model' as any)
    const executeSpy = jest.spyOn(interactorStub, 'execute')
    await sut.handle(fakeRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('mapped request model')
  })
  it('should throw if interactor throws', async () => {
    const { sut, interactorStub } = makeSut()
    jest.spyOn(interactorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
  })
  it('should call validator with request dto', async () => {
    const { sut, validatorStub } = makeSut()
    const isValidSpy = jest.spyOn(validatorStub, 'isValid')
    await sut.handle(fakeRequest)
    expect(isValidSpy).toBeCalledTimes(1)
    expect(isValidSpy).toBeCalledWith(fakeRequest)
  })
  it('should throw if validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
  })
  it('should not call mapper if validator throws', async () => {
    const { sut, validatorStub, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    jest.spyOn(validatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
    expect(mapSpy).not.toHaveBeenCalled()
  })
  it('should not call interactor if validator throws', async () => {
    const { sut, validatorStub, interactorStub } = makeSut()
    const executeSpy = jest.spyOn(interactorStub, 'execute')
    jest.spyOn(validatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequest)).rejects.toThrow()
    expect(executeSpy).not.toHaveBeenCalled()
  })
})
