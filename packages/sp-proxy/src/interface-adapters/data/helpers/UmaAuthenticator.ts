import axios from 'axios'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'

export class UmaAuthenticator implements IUmaAuthenticator {
  constructor(
    private readonly umaHeaderParser: IUmaHeaderParser,
    private readonly jwtSigner: IJwtSigner
  ) {}

  async authenticate(endpoint: string): Promise<string> {
    const response = await axios.get(endpoint)
    if (response.status !== 401) {
      throw new Error()
    }
    return ''
  }
}
