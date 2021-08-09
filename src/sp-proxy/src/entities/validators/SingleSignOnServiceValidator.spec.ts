// should be a list
// minimum lenght is 1

import { InvalidValueError } from '@sp-proxy/entities/errors/InvalidValueError'
import { ValueObject } from '@sp-proxy/entities/types/ValueObject'
import { SingleSignOnServiceValidator } from '@sp-proxy/entities/validators/SingleSignOnServiceValidator'
import { SingleSignOnServiceProps } from '@sp-proxy/entities/value-objects/SignleSignOnServices'

// each item
// item should have a binding, location

const makeSut = (): SingleSignOnServiceValidator => {
  return new SingleSignOnServiceValidator()
}

const makeSingleSignOnService = (
  props: any
): ValueObject<SingleSignOnServiceProps> => {
  class SingleSignOnServiceStub extends ValueObject<SingleSignOnServiceProps> {
    // do nothing
  }
  return new SingleSignOnServiceStub(props)
}

describe('SingleSignOnServiceValidator', () => {
  it('should throw if there is no binding in SingleSignOnService', () => {
    const sut = makeSut()
    const invalidProps = {
      location: 'valid location'
    }
    const fakeObject = makeSingleSignOnService(invalidProps)
    expect(() => {
      sut.isValid(fakeObject)
    }).toThrow(new InvalidValueError('SingleSignOnService'))
  })
  it('should throw if there is no location in SingleSignOnService', () => {
    const sut = makeSut()
    const invalidProps = {
      binding: 'valid binding'
    }
    const fakeObject = makeSingleSignOnService(invalidProps)
    expect(() => {
      sut.isValid(fakeObject)
    }).toThrow(new InvalidValueError('SingleSignOnService'))
  })
  it('should throw if location is not string', () => {
    const sut = makeSut()
    const invalidProps = {
      location: 2,
      binding: 'valid binding'
    }
    const fakeObject = makeSingleSignOnService(invalidProps)
    expect(() => {
      sut.isValid(fakeObject)
    }).toThrow(new InvalidValueError('SingleSignOnService'))
  })
  it('should throw if location is not string', () => {
    const sut = makeSut()
    const invalidProps = {
      location: 'valid location',
      binding: 2
    }
    const fakeObject = makeSingleSignOnService(invalidProps)
    expect(() => {
      sut.isValid(fakeObject)
    }).toThrow(new InvalidValueError('SingleSignOnService'))
  })
})
