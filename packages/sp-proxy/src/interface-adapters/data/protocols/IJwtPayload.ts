export interface IJwtPayload {
  iss: string
  sub: string
  iat: number
  exp: number
  jti: string
  aud: string
}
