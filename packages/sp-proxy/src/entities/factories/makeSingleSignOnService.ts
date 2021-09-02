import { SingleSignOnServiceValidator } from '@sp-proxy/entities/validators/SingleSignOnServiceValidator'
import {
  SingleSignOnService,
  SingleSignOnServiceProps
} from '@sp-proxy/entities/value-objects/SingleSignOnServices'

export const makeSingleSignOnService = (
  props: SingleSignOnServiceProps
): SingleSignOnService => {
  const validator = new SingleSignOnServiceValidator()
  return new SingleSignOnService(props, validator)
}
