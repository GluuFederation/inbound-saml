import { IService } from '../protocols/IService'
import { RemoteIdpUseCaseParams } from './RemoteIdpUseCaseParams'

interface TRProps {
  id: string
  selectedSsoService: IService
  remoteIdp: RemoteIdpUseCaseParams
}

export type ListTRsResponseUseCaseParams = TRProps[]
