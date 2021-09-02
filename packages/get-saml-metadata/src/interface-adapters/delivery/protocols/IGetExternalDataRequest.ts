export type SourceType = 'file' | 'url'
export interface IGetExternalDataRequest {
  source: SourceType
  urlOrPath: string
}
