export interface IKeyCertFormatter {
  format: (keyOrCert: string) => Promise<string>
}
