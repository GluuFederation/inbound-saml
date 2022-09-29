import { faker } from '@faker-js/faker'
import { NotNullOrUndefinedValidator } from './NotNullOrUndefinedValidator'

describe('NotNullOrUndefinedValidator', () => {
  it('should throw if param is undefined', () => {
    const sut = new NotNullOrUndefinedValidator()
    expect(() => sut.isValid(undefined)).toThrow(
      'InvalidData: Value cannot be null or undefined'
    )
  })
  it('should throw if param is null', () => {
    const sut = new NotNullOrUndefinedValidator()
    expect(() => sut.isValid(null)).toThrow(
      'InvalidData: Value cannot be null or undefined'
    )
  })
  it('should return true if not undefined or null', () => {
    const sut = new NotNullOrUndefinedValidator()
    expect(sut.isValid(faker.datatype.string())).toBeTruthy()
    expect(sut.isValid(faker.datatype.number())).toBeTruthy()
  })
})
