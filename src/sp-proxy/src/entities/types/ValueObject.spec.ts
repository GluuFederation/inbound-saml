/**
 * Importing * as ... needed to adapt to jest.SpyOn requirements
 */
import * as helper from '@sp-proxy/entities/helpers/deeplyEqual'
import { ValueObject } from '@sp-proxy/entities/types/ValueObject'
jest.mock('@sp-proxy/entities/helpers/deeplyEqual')

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

describe('ValueObject', () => {
  describe('equal', () => {
    it('should call deeplyEqual once with correct values', () => {
      const deeplyEqualSpy = jest.spyOn(helper, 'deeplyEqual')
      const sut = makeSut()
      const equalSut = makeSut()
      // jest.spyOn(sut, 'equal' as any).mockReturnValueOnce('')
      sut.equal(equalSut)
      expect(deeplyEqualSpy).toHaveBeenCalledTimes(1)

      // first param of first call
      expect(deeplyEqualSpy.mock.calls[0][0]).toStrictEqual(equalSut.props)
    })
    it('should return false if deeplyEqual returns false', () => {
      jest.spyOn(helper, 'deeplyEqual').mockReturnValueOnce(false)
      const sut = makeSut()
      const anotherSut = makeSut()
      expect(sut.equal(anotherSut)).toBeFalsy()
    })
    it('should return true if deeplyEqual returns true', () => {
      jest.spyOn(helper, 'deeplyEqual').mockReturnValueOnce(true)
      const sut = makeSut()
      const anotherSut = makeSut()
      expect(sut.equal(anotherSut)).toBeTruthy()
    })
  })
})
