import { IMetadataLoader } from '../../value-objects/protocols/IMetadataLoader'

export interface IMetadataLoadService {
  readonly urlOrPath: string
  readonly loader: IMetadataLoader
  load: () => string
}
