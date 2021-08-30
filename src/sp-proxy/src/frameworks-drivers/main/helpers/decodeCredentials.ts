import { ISimpleCredentials } from '@sp-proxy/frameworks-drivers/main/protocols/ISimpleCredentials'

export const decodeCredentials = (
  encodedCredentials: string
): ISimpleCredentials => {
  const credentials = Buffer.from(encodedCredentials, 'base64')
    .toString()
    .split(':')
  return {
    user: credentials[0],
    password: credentials[1]
  }
}
