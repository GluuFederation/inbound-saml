export interface IMetadataLoaderRepository {
  load: (urlOrPath: string) => string
}
