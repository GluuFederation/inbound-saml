/**
 * - getFromFile(controller.handle(getExternalDataRequest))
 * -
 * - sends requestmodel to usecase
 */

import { GetExternalDataRequestModel } from '../../use-cases/GetExternalDataRequestModel'
import { IGetExternalDataInputBoundary } from '../../use-cases/IGetExternalDataInputBoundary'
import { IValidator } from '../../use-cases/ports/IValidator'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
import { GetExternalDataController } from './GetExternalDataController'
import { IGetExternalDataRequest } from './protocols/IGetExternalDataRequest'
import { IRequest } from './protocols/IRequest'

const makeRequestValidator = (): IValidator => {
  class RequestvalidatorStub implements IValidator {
    isValid (urlOrPath: 'string'): boolean {
      return true
    }
  }
  return new RequestvalidatorStub()
}

const makeGetExternalDataInteractor = (): IGetExternalDataInputBoundary => {
  class ExternalDataInteractorStub implements IGetExternalDataInputBoundary {
    async execute (request: GetExternalDataRequestModel): Promise<void> {

    }
  }
  return new ExternalDataInteractorStub()
}
interface sutType {
  sut: GetExternalDataController,
  externalDataInteractorStub: IGetExternalDataInputBoundary,
  requestValidatorStub: IValidator
}

const makeSut = (): sutType => {
  const requestValidatorStub = makeRequestValidator()
  const externalDataInteractorStub = makeGetExternalDataInteractor()
  const sut = new GetExternalDataController(
    externalDataInteractorStub,
    requestValidatorStub
  )
  return {
    sut,
    externalDataInteractorStub,
    requestValidatorStub
  }
}

const validRequest: IRequest<IGetExternalDataRequest> = {
  id: 'valid id',
  request: {
    source: 'file',
    urlOrPath: 'valid path'
  }
}

describe('GetExternalDataController', () => {
  it('should call isValid once with correct params', async () => {
    const { sut, requestValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(requestValidatorStub, 'isValid')
    await sut.handle(validRequest)
    expect(isValidSpy).toHaveBeenCalledTimes(1)
    expect(isValidSpy).toHaveBeenCalledWith(validRequest.request.urlOrPath)
  })
  it('should throw InvalidUrlOrPathError if validator returns false', async () => {
    const { sut, requestValidatorStub } = makeSut()
    jest.spyOn(requestValidatorStub, 'isValid').mockReturnValue(false)
    const promise = sut.handle(validRequest)
    await expect(promise).rejects.toThrow(new InvalidPathOrUrlError(
      validRequest.request.urlOrPath
    ))
  })
})
