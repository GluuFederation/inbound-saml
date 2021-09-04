export interface IKeyCertLoader {
  load: (path: string) => Promise<string>
}
