import { IExternalDataMapper } from '../../../use-cases/ports/IExternalDataMapper'
import { ExternalDataMapper } from '../../../use-cases/utils/ExternalDataMapper'

export const makeExternalDataMapper = (): IExternalDataMapper => {
  return new ExternalDataMapper()
}
