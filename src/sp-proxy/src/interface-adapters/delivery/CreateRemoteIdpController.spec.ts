// controller handle() receives IRequest<CreateRemoteIdpController>
// maps to IRequestModel
// calls interactor execute() w/ IRequestModel

import { CreateRemoteIdpController } from '@sp-proxy/interface-adapters/delivery/CreateRemoteIdpController'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { fakeCreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/mocks/fakeCreateRemoteIdpRequest.mock'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IMapper } from '@sp-proxy/interface-adapters/protocols/IMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
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
  class InteractorStub implements ICreateRemoteIdpInputBoundary {
    async execute(
      request: IRequestModel<CreateRemoteIdpRequestModel>
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
  sut: CreateRemoteIdpController
  mapperStub: IMapper<ICreateRemoteIdpRequest, CreateRemoteIdpRequestModel>
  interactorStub: ICreateRemoteIdpInputBoundary
  validatorStub: IValidator
}
const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const interactorStub = makeInteractor()
  const validatorStub = makeValidator()
  const sut = new CreateRemoteIdpController(
    mapperStub,
    interactorStub,
    validatorStub
  )
  return {
    sut: sut,
    mapperStub: mapperStub,
    interactorStub: interactorStub,
    validatorStub
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

    it('should call interactor execute once w/ map response', async () => {
      const { sut, interactorStub, mapperStub } = makeSut()
      const executeSpy = jest.spyOn(interactorStub, 'execute')
      jest
        .spyOn(mapperStub, 'map')
        .mockReturnValueOnce('valid mapped value' as any)
      await sut.handle(fakeRequest)
      expect(executeSpy).toHaveBeenCalledTimes(1)
      expect(executeSpy).toHaveBeenCalledWith('valid mapped value')
    })

    it('should call validator with request', async () => {
      const { sut, validatorStub } = makeSut()
      const isValidSpy = jest.spyOn(validatorStub, 'isValid')
      await sut.handle(fakeRequest)
      expect(isValidSpy).toHaveBeenCalledTimes(1)
      expect(isValidSpy).toHaveBeenCalledWith(fakeRequest)
    })

    it('should throw InvalidRequestError if validator throws', async () => {
      const { sut, validatorStub } = makeSut()
      jest
        .spyOn(validatorStub, 'isValid')
        .mockRejectedValueOnce(new InvalidRequestError('Valid error'))
      await expect(sut.handle(fakeRequest)).rejects.toThrow(InvalidRequestError)
    })
  })
})
