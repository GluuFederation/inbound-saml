import { IValidator } from '@sp-proxy/entities/protocols/IValidator'
import { ValueObject } from '@sp-proxy/entities/types/ValueObject'

export interface SingleSignOnServiceProps {
  binding: string
  location: string
}

export class SingleSignOnService extends ValueObject<SingleSignOnServiceProps> {
  private readonly validator
  constructor(props: SingleSignOnServiceProps, validator: IValidator) {
    super(props)
    this.validator = validator
    this.validator.isValid(this)
  }
}
