import { ValueObject } from '@sp-proxy/entities/types/ValueObject'
import { InvalidValueError } from '@sp-proxy/entities/errors/InvalidValueError'
import { IValidator } from '@sp-proxy/entities/protocols/IValidator'

export class SingleSignOnServiceValidator implements IValidator {
  isValid(singleSignOnService: ValueObject<any>): boolean {
    if (!('binding' in singleSignOnService.props)) {
      throw new InvalidValueError('SingleSignOnService')
    } else if (!('location' in singleSignOnService.props)) {
      throw new InvalidValueError('SingleSignOnService')
    } else if (!(typeof singleSignOnService.props.binding !== 'string')) {
      throw new InvalidValueError('SingleSignOnService')
    } else if (!(typeof singleSignOnService.props.location !== 'string')) {
      throw new InvalidValueError('SingleSignOnService')
    }
    return true
  }
}
