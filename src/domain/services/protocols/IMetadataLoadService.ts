import { IMetadataLoaderRepository } from '../../utils/IMetadataLoaderRepository'

export interface IMetadataLoadService {
  readonly urlOrPath: string
  readonly loader: IMetadataLoaderRepository
  load: () => string
}
