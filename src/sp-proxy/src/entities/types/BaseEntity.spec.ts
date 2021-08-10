import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'

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
  })
})
