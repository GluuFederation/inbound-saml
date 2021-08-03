import { GetExternalDataRequestMapper } from '../mappers/GetExternalDataRequestMapper'
import { IGetExternalDataRequestMapper } from '../protocols/IRequestMapper'

export const makeGetExternalDataRequestMapper = (): IGetExternalDataRequestMapper => {
  return new GetExternalDataRequestMapper()
}
