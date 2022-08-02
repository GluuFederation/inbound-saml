import { EnvReadPersistenceConfig } from '../EnvReadPersistenceConfig'
import { EnvLoader } from '../helpers/EnvLoader'
import { IPersistenceConfigLoader } from '../protocols/IPersistenceConfigLoader'
import { NotNullOrUndefinedValidator } from '../validators/NotNullOrUndefinedValidator'
import { OxTrustApiSettingsValidator } from '../validators/OxTrustApiSettingsValidator'

export const makeApiSettingsFromEnvLoader = (): IPersistenceConfigLoader => {
  const notNullOrUndefinedValidator = new NotNullOrUndefinedValidator()
  const oxTrustApiSettingsValidator = new OxTrustApiSettingsValidator(
    notNullOrUndefinedValidator
  )
  const envLoader = new EnvLoader()
  return new EnvReadPersistenceConfig(oxTrustApiSettingsValidator, envLoader)
}
