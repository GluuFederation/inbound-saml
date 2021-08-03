import { EventEmitter } from 'stream'
import { GetExternalDataResponseModel } from '../../use-cases/GetExternalDataResponseModel'
import { IGetExternalDataOutputBoundary } from '../../use-cases/IGetExternalDataOutputBoundary'
import { IResponseModel } from '../../use-cases/IResponseModel'
import { GetExternalDataPresenter } from './GetExternalDataPresenter'
import { IGetExternalDataRequest } from './protocols/IGetExternalDataRequest'
import { IRequest } from './protocols/IRequest'

interface SutTypes {
  emiter: EventEmitter
  sut: IGetExternalDataOutputBoundary
}

const fakeRequest: IRequest<IGetExternalDataRequest> = {
  id: 'valid request id',
  request: {
    source: 'file',
    urlOrPath: '/valid/path/to.xml'
  }
}

const fakeResponse: IResponseModel<GetExternalDataResponseModel> = {
  requestId: fakeRequest.id,
  response: {
    externalData: {
      idpSigningCert: ['valid cert'],
      singleSignOnServices: [
        {
          location: 'valid location',
          binding: 'valid binding'
        }
      ]
    }
  }
}

const makeSut = (): SutTypes => {
  const emiter = new EventEmitter()
  const sut = new GetExternalDataPresenter(emiter)
  return {
    emiter,
    sut
  }
}

describe('GetExternalDataPresenter', () => {
  it('should call emiter.emit with correct params', () => {
    const { emiter, sut } = makeSut()
    const emitSpy = jest.spyOn(emiter, 'emit')
    sut.present(fakeResponse)
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(
      fakeRequest.id,
      fakeResponse
    )
  })
})
