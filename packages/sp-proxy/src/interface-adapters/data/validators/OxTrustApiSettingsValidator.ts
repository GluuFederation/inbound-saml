import { PersistenceError } from '../errors/PersistenceError'
import { IValidator } from '../protocols/IValidator'

export class OxTrustApiSettingsValidator implements IValidator {
  requiredKeys = [
    'host',
    'clientId',
    'completePath',
    'tokenUrl',
    'kid',
    'pkvPath'
  ]

  isValid(loadedFromEnv: object): boolean {
    for (const requiredKey of this.requiredKeys) {
      if (!(requiredKey in loadedFromEnv)) {
        throw new PersistenceError(
          'Error validating OxTrustApiSettings loaded from env. Required key is missing.'
        )
      }
    }
    return true
  }
}
