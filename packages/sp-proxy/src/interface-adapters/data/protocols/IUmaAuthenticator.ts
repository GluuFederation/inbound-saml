export interface IUmaAuthenticator {
  authenticate: (endpoint: string) => Promise<string>
}
