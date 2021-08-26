import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { GetTrByHostValidator } from '@sp-proxy/interface-adapters/delivery/validators/GetTrByHostValidator'
import * as urlValidator from '@sp-proxy/interface-adapters/delivery/validators/singles/isValidUrl'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'

const fakeRequest: IRequest<IGetTrByHostRequest> = {
  id: 'fake request id',
  body: {
    host: 'myhost.com'
  }
}

describe('GetTrByHostValidator', () => {
  it('should call isValidUrl with url', async () => {
    const isValidUrlSpy = jest.spyOn(urlValidator, 'isValidUrl')
    const sut = new GetTrByHostValidator()
    await sut.isValid(fakeRequest)
    expect(isValidUrlSpy).toHaveBeenCalledTimes(1)
    expect(isValidUrlSpy).toHaveBeenCalledWith(
      `https://${fakeRequest.body.host}`
    )
  })
})
