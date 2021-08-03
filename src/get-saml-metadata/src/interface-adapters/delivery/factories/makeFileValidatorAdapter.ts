import { BaseFileValidator } from '../../../use-cases/ports/BaseFileValidator'
import { FileValidatorAdapter } from '../../data/adapters/FileValidatorAdapter'

export const makeFileValidatorAdapter = (): BaseFileValidator => {
  return new FileValidatorAdapter()
}
