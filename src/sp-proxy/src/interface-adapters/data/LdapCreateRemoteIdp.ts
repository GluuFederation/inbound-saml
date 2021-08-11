import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import * as ldap from 'ldapjs'

export class LdapCreateRemoteIdp implements ICreateRemoteIdpGateway {
  constructor(
    private readonly client: ldap.Client,
    private readonly dn: string,
    private readonly rdnAttribute: string
  ) {}

  async create(remoteIdp: RemoteIdp): Promise<boolean> {
    const rdn = `${this.rdnAttribute}=${remoteIdp.id}`
    const name = `${rdn},${this.dn}`
    this.client.add(name, remoteIdp.props, (err) => {
      throw new PersistenceError(err.name + ': ' + err.message)
    })
    return await Promise.resolve(true)
  }
}
