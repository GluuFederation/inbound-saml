import { PersistenceError } from '../errors/PersistenceError'
import { IValidator } from '../protocols/IValidator'

export class OxTrustApiSettingsValidator implements IValidator {
  constructor(private readonly nullOrUndefinedValidator: IValidator) {}
  private readonly requiredKeys = [
    'host',
    'clientId',
    'completePath',
    'tokenUrl',
    'kid',
    'pvkPath'
  ]

  isValid(loadedFromEnv: { [key: string]: any }): boolean {
    for (const requiredKey of this.requiredKeys) {
      if (!(requiredKey in loadedFromEnv)) {
        throw new PersistenceError(
          'Error validating OxTrustApiSettings loaded from env. Required key is missing.'
        )
      }
    }
    for (const loadedKey in loadedFromEnv) {
      this.nullOrUndefinedValidator.isValid(loadedFromEnv[loadedKey])
    }
    return true
  }
}
