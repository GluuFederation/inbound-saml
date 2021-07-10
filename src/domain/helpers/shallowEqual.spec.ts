import { shallowEqual } from './shallowEqual'

describe('shallowEqual helper', () => {
  it('should return false if objects keys number (lenght) are different', () => {
    const fakeObject1 = {
      name: 'john',
      lastName: 'doe'
    }
    const fakeObject2 = {
      name: 'john',
      lastName: 'doe',
      age: 25
    }
    expect(
      shallowEqual(fakeObject1, fakeObject2)
    ).toBeFalsy()
  })
})
