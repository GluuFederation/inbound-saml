// receives inputs from string loaded from env
// 1. throws if required fields not there
// 2. throws if null or undefined

import { PersistenceError } from '../errors/PersistenceError'
import { OxTrustApiSettingsValidator } from './OxTrustApiSettingsValidator'

// export interface IOxTrustApiSettings {
//   host: string
//   clientId: string
//   completePath: string
//   tokenUrl: string
//   kid: string
//   pvkPath: string
// }

// const validSettingsFromEnv = {
//   host: 'valid host',
//   clientId: 'valid client Id',
//   completePath: 'valid complete path',
//   tokenUrl: 'valid token url',
//   kid: 'valid kid',
//   pvkPath: 'valid pvkPath'
// }

describe('OxTrustApiSettingsValidator', () => {
  it('should throw if required fields are missing', () => {
    const mockedInvalidSettingsFromEnv = {
      host: 'valid host',
      clientId: 'valid client Id'
    }
    const sut = new OxTrustApiSettingsValidator()
    expect(() => sut.isValid(mockedInvalidSettingsFromEnv)).toThrow(
      new PersistenceError(
        'Error validating OxTrustApiSettings loaded from env. Required key is missing.'
      )
    )
  })
})
