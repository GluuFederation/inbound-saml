/**
 * - getFromFile(controller.handle(getExternalDataRequest))
 * -
 * - sends requestmodel to usecase
 */

import { GetExternalDataRequestModel } from '../../use-cases/GetExternalDataRequestModel'
import { IGetExternalDataInputBoundary } from '../../use-cases/IGetExternalDataInputBoundary'
import { IRequestModel } from '../../use-cases/IRequestModel'
import { IValidator } from '../../use-cases/ports/IValidator'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
import { GetExternalDataController } from './GetExternalDataController'
import { IGetExternalDataRequest } from './protocols/IGetExternalDataRequest'
import { IRequest } from './protocols/IRequest'
import { IRequestMapper } from './protocols/IRequestMapper'

const makeMapper = (): IRequestMapper => {
  class RequestMapperStub implements IRequestMapper {
    map (request: IRequest<any>): IRequestModel {
      return {
        requestId: 'valid id'
      }
    }
  }
  return new RequestMapperStub()
}

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
  sut: GetExternalDataController
  externalDataInteractorStub: IGetExternalDataInputBoundary
  requestValidatorStub: IValidator
  requestMapperStub: IRequestMapper
}

const makeSut = (): sutType => {
  const requestValidatorStub = makeRequestValidator()
  const externalDataInteractorStub = makeGetExternalDataInteractor()
  const requestMapperStub = makeMapper()
  const sut = new GetExternalDataController(
    externalDataInteractorStub,
    requestValidatorStub,
    requestMapperStub
  )
  return {
    sut,
    externalDataInteractorStub,
    requestValidatorStub,
    requestMapperStub
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
  it('should call map with request object', async () => {
    const { sut, requestMapperStub } = makeSut()
    const mapSpy = jest.spyOn(requestMapperStub, 'map')
    await sut.handle(validRequest)
    expect(mapSpy).toHaveBeenCalledWith(validRequest)
  })
})
