// validatos if 'id' in body
// validates if 'id' not empty
// validates if 'id' is string

import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { GetByIdValidator } from '@sp-proxy/interface-adapters/delivery/validators/GetByIdValidator'

describe('GetByIdValidator', () => {
  it('should throw InvalidRequestError if there is no id in body', async () => {
    const sut = new GetByIdValidator()
    const request = {
      id: 'valid id',
      body: {
        anotherKey: 'another value'
      }
    }
    await expect(sut.isValid(request as any)).rejects.toThrow(
      InvalidRequestError
    )
  })
  it('should throw InvalidRequestError if there is id is null', async () => {
    const sut = new GetByIdValidator()
    const request = {
      id: 'valid id',
      body: {
        id: null
      }
    }
    await expect(sut.isValid(request as any)).rejects.toThrow(
      InvalidRequestError
    )
  })
  it('should throw InvalidRequestError if id is not a string', async () => {
    const sut = new GetByIdValidator()
    const request = {
      id: 'valid id',
      body: {
        id: 123
      }
    }
    await expect(sut.isValid(request as any)).rejects.toThrow(
      InvalidRequestError
    )
  })
})
