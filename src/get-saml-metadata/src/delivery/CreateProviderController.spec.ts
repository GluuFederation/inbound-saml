import { IController } from './protocols/IController'
import { IRequest } from './protocols/IRequest'
import { IResponse } from './protocols/IResponse'

const makeSut = (): IController => {
  class FileCreateProviderControllerStub implements IController {
    async handle (request: IRequest): Promise<IResponse> {
      return await Promise.resolve({ response: 'valid response' })
    }
  }
  return new FileCreateProviderControllerStub()
}
const fakeRequest: IRequest = {
  request: {
    source: 'file',
    urlOrPath: '/valid/path'
  }
}
describe('CreateProviderController', () => {
  it('should return error if throws', async () => {
    const sut = makeSut()
    await sut.handle(fakeRequest)
  })
})
