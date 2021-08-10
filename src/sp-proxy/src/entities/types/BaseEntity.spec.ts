import * as helper from '@sp-proxy/entities/helpers/isEntity'
import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'
jest.mock('@sp-proxy/entities/helpers/isEntity')

interface IAnyProps {
  validProp: string
}
class AnyEntity extends BaseEntity<IAnyProps> {}

describe('BaseEntity', () => {
  describe('equal', () => {
    it('should return false if undefined', () => {
      const sut = new AnyEntity({ validProp: 'valid value' })
      expect(sut.equals(undefined as any)).toBeFalsy()
    })
    it('should return true if is the same entity', () => {
      const sut = new AnyEntity({ validProp: 'valid value' })
      expect(sut.equals(sut)).toBeTruthy()
    })
    it('should return false if isEntity returns false', () => {
      const sut = new AnyEntity({ validProp: 'valid value' })
      jest.spyOn(helper, 'isEntity').mockReturnValueOnce(false)
      expect(sut.equals({ thats: 'not an entity' } as any)).toBeFalsy()
    })
    it('should return true if same entity id', () => {
      const sut = new AnyEntity({ validProp: 'validValue' }, 'valid id')
      jest.spyOn(helper, 'isEntity').mockReturnValueOnce(true)
      const another = new AnyEntity({ validProp: 'validValue' }, 'valid id')
      expect(sut.equals(another)).toBeTruthy()
    })
  })
})
