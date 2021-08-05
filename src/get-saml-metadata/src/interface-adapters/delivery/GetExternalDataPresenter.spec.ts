import { GetExternalDataPresenter } from '@get-saml-metadata/interface-adapters/delivery/GetExternalDataPresenter'
import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { GetExternalDataResponseModel } from '@get-saml-metadata/use-cases/GetExternalDataResponseModel'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { EventEmitter } from 'stream'

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
