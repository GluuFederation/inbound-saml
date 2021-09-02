import { isEntity } from '@sp-proxy/entities/helpers/isEntity'
import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'

describe('isEntity', () => {
  it('should return false if value is NOT an instance of Entity', () => {
    class NotAnEntity {
      doSomething(): any {
        // do something
      }
    }
    const notAnEntity = new NotAnEntity()
    expect(isEntity(notAnEntity)).toBeFalsy()
  })
  it('should return true if valur IS an instance of Entity', () => {
    interface IFakeProps {
      value: any
    }
    class Entity extends BaseEntity<IFakeProps> {
      doSomething(): any {
        // do something
      }
    }
    const entity = new Entity({ value: 'any value' })
    expect(isEntity(entity)).toBeTruthy()
  })
})
