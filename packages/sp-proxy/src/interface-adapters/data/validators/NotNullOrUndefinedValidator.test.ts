import { NotNullOrUndefinedValidator } from './NotNullOrUndefinedValidator'

describe('NotNullOrUndefinedValidator', () => {
  it('should throw if param is null', () => {
    const sut = new NotNullOrUndefinedValidator()
    expect(() => sut.isValid(undefined)).toThrow(
      'InvalidData: Value cannot be null or undefined'
    )
  })
  it('should throw if param is undefined', () => {})
})
