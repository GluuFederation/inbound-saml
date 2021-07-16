export interface IMetadataLoader {
  load: (urlOrPath: string) => string
}
