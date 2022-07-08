import { IOxTrustApiSettings } from './IOxTrustApiSettings'

export interface IPersistenceConfigLoader {
  load: () => IOxTrustApiSettings
}
