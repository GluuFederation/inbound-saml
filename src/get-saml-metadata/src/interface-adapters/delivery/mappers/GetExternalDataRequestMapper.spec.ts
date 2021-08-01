import { GetExternalDataRequestModel } from '../../../use-cases/GetExternalDataRequestModel'
import { IGetExternalDataRequest } from '../protocols/IGetExternalDataRequest'
import { IRequest } from '../protocols/IRequest'
import { GetExternalDataRequestMapper } from './GetExternalDataRequestMapper'

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
