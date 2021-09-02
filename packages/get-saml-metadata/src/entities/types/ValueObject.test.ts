import { ValueObject } from '@get-saml-metadata/entities/types/ValueObject'

interface ISutProps {
  key1: string
  key2: string
}

const sutProps: ISutProps = {
  key1: 'valid value 1',
  key2: 'valid value 2'
}

const makeSut = (): ValueObject<ISutProps> => {
  class ValidValueObject extends ValueObject<ISutProps> {}
  return new ValidValueObject(sutProps)
}

describe('ValueObject - integration', () => {
  describe('equal', () => {
    it('should return false if different props', () => {
      const sut = makeSut()
      const differentProps: ISutProps = {
        key1: 'different value 1',
        key2: 'different value 2'
      }
      class DifferentVO extends ValueObject<ISutProps> {}
      const differentVO = new DifferentVO(differentProps)
      expect(sut.equal(differentVO)).toBeFalsy()
    })
    it('should return true if same props', () => {
      const sut = makeSut()
      const equalSut = makeSut()
      expect(sut.equal(equalSut)).toBeTruthy()
    })
    it('should return false if undefined vo', () => {
      const sut = makeSut()
      expect(sut.equal(undefined)).toBeFalsy()
    })
    it('should return false if null vo', () => {
      const sut = makeSut()
      expect(sut.equal()).toBeFalsy()
    })
  })
})
