export interface IGetExternalDataRequest {
  source: 'file' | 'url'
  urlOrPath: string
}
