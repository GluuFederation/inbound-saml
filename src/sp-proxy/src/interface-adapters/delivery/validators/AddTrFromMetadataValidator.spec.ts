import { AddTrFromMetadataValidator } from '@sp-proxy/interface-adapters/delivery/validators/AddTrFromMetadataValidator'
import * as vUrl from '@sp-proxy/interface-adapters/delivery/validators/singles/isValidUrl'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataRequest'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
jest.mock('@sp-proxy/interface-adapters/delivery/validators/singles/isValidUrl')

const fakeRequestDto: IRequest<IAddTrFromMetadataRequest> = {
  id: 'another valid request id',
  body: {
    name: 'another valid name',
    url: 'another valid url'
  }
}

describe('AddTrFromMEtadataValidator', () => {
  it('should call valid isValidUrl with url prop', async () => {
    const isValidUrlSpy = jest.spyOn(vUrl, 'isValidUrl')
    const sut = new AddTrFromMetadataValidator()
    await sut.isValid(fakeRequestDto)
    expect(isValidUrlSpy).toHaveBeenCalledTimes(1)
    expect(isValidUrlSpy).toHaveBeenCalledWith(fakeRequestDto.body.url)
  })
})
