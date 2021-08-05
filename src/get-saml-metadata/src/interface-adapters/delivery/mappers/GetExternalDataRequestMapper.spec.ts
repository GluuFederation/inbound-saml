import { GetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/mappers/GetExternalDataRequestMapper'
import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'

const fakeRequest: IRequest<IGetExternalDataRequest> = {
  id: 'valid id',
  request: {
    source: 'file',
    urlOrPath: 'valid/path'
  }
}

describe('GetExternalDataRequestMapper', () => {
  it('should return correct request model', () => {
    const sut = new GetExternalDataRequestMapper()
    const result = sut.map(fakeRequest)
    const expected: GetExternalDataRequestModel = {
      requestId: fakeRequest.id,
      urlOrPath: fakeRequest.request.urlOrPath
    }
    expect(result).toStrictEqual(expected)
  })
})
