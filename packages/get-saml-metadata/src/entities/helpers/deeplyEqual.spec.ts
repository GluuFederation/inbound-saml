import { deeplyEqual } from './deeplyEqual'

describe('deeplyEqual helper', () => {
  it('should return false if objects keys lenght are different', () => {
    const fakeObject1 = {
      name: 'john',
      lastName: 'doe'
    }
    const fakeObject2 = {
      name: 'john',
      lastName: 'doe',
      age: 25
    }
    expect(deeplyEqual(fakeObject1, fakeObject2)).toBeFalsy()
  })

  it('should return false if objects keys and values are different and same keys lenght', () => {
    const fakeObject1 = {
      name: 'john',
      lastName: 'doe'
    }
    const fakeObject2 = {
      name: 'john',
      lastName: 'notdoe'
    }
    expect(deeplyEqual(fakeObject1, fakeObject2)).toBeFalsy()
  })

  it('should return false if different keys and same values', () => {
    const fakeObject1 = {
      name: 'john',
      lastName: 'doe'
    }
    const fakeObject2 = {
      name: 'john',
      last: 'doe'
    }
    expect(deeplyEqual(fakeObject1, fakeObject2)).toBeFalsy()
  })

  it('should return true if same keys and values', () => {
    const fakeObject1 = {
      name: 'john',
      lastName: 'doe'
    }
    const fakeObject2 = {
      name: 'john',
      lastName: 'doe'
    }
    expect(deeplyEqual(fakeObject1, fakeObject2)).toBeTruthy()
  })

  it('should return true if same nested keys and values', () => {
    const fakeObject1 = {
      name: 'john',
      lastName: 'doe',
      childs: [
        {
          name: 'joseph',
          lastName: 'doe'
        },
        {
          name: 'johan',
          lastName: 'doe'
        }
      ]
    }
    const fakeObject2 = {
      name: 'john',
      lastName: 'doe',
      childs: [
        {
          name: 'joseph',
          lastName: 'doe'
        },
        {
          name: 'johan',
          lastName: 'doe'
        }
      ]
    }
    expect(deeplyEqual(fakeObject1, fakeObject2)).toBeTruthy()
  })
  it('should return false if different nested keys and values', () => {
    const fakeObject1 = {
      name: 'john',
      lastName: 'doe',
      childs: [
        {
          name: 'joseph',
          lastName: 'doe'
        },
        {
          name: 'johan',
          lastName: 'doe'
        }
      ]
    }
    const fakeObject2 = {
      name: 'john',
      lastName: 'doe',
      childs: [
        {
          name: 'joseph',
          lastName: 'doe'
        },
        {
          name: 'notJohan',
          lastName: 'doe'
        }
      ]
    }
    expect(deeplyEqual(fakeObject1, fakeObject2)).toBeFalsy()
  })
})
