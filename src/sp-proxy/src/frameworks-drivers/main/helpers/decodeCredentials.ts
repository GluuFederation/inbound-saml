import { ISimpleCredentials } from '@sp-proxy/frameworks-drivers/main/protocols/ISimpleCredentials'

export const decodeCredentials = (
  encodedCredentials: string
): ISimpleCredentials => {
  Buffer.from(encodedCredentials, 'base64')
  return {
    user: '',
    password: ''
  }
}
