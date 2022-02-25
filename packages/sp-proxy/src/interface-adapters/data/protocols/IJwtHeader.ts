export interface IJwtHeader {
  TYP: 'JWT'
  alg: 'RS256' | 'RS512'
  kid: string
}
